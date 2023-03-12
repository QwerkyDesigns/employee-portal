import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { PrintifyImageResource } from '../externalServices/printify/UploadImageToPrintify';
import UploadImageToPrintify from '../externalServices/printify/UploadImageToPrintify';
import createPresignedUrlForViewing from '../stores/s3Core/createPresignedUrlForViewing';
import { imageStoreBucket } from '../stores/uncategorizedCreatedImagesStore/imageStoreConstants';
import { MoveFileFromThisUncategorizedContainerTo } from '../stores/uncategorizedCreatedImagesStore/MoveFileFromThisContainerTo';
import { archiveStoreBucket } from '../stores/archivedImageStore/archivedImageStoreConstants';
import PrintifyError from '../errors/application-errors/PrintifyError';
import { getSession } from 'next-auth/react';
import { prisma } from '../client/prisma';
import printifyClient from '../client/printifyClient';
import { AxiosInstance } from 'axios';
import PrintifyApiKeyNotRegisteredError from '../errors/bad-request/PrintifyApiKeyNotRegisteredError';

// this file is a bit of a special snowflake.
// We'll need to find a better way to deal with integration in general - and the ui will need to accomodate.
// Imagine we've got a user that wants to send their creations to multiple places - we should support that I
// would think. What other ideas / thoughts can you come up with?

const TryGetPrintifyApi = async (emailAddres: string): Promise<string | undefined> => {
    const account = await prisma.account.findUnique({
        where: {
            email: emailAddres
        }
    });

    const externalServicesRecordId = account?.externalServicesId;
    if (externalServicesRecordId === null) return undefined;
    const record = await prisma.externalServices.findUnique({
        where: {
            id: externalServicesRecordId
        }
    });
    const apiKey = record?.printifyApiKey;
    return apiKey;
};

class CategorizeAndUploadController extends AuthenticatedBaseController {
    private printifyClient: AxiosInstance = null!;

    constructor() {
        super();

        this.before(async (req, res) => {
            const session = await getSession({ req });

            const userEmail = session?.user?.email;
            if (userEmail) {
                const apiKey = await TryGetPrintifyApi(userEmail);
                if (apiKey) {
                    this.printifyClient = printifyClient(apiKey);
                    return;
                }
            }
            throw new PrintifyApiKeyNotRegisteredError('Your account does not have a registered Printify Api Key. Please set one in your account settings.');
        });

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message]
            });
        });

        this.rescue(PrintifyApiKeyNotRegisteredError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message]
            });
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<CreateImageCategorizationResponse>) {
        const { imageKeys, productNames } = getBody<CreateImageCategorizationRequest>(req);

        const imageKeyList = imageKeys.split(',');
        const productNamesList = productNames.split(',');
        const results: PrintifyImageResource[] = [];

        // TODO: make concurrent
        for (let i = 0; i < imageKeyList.length; i++) {
            const imageKey = imageKeyList[i];
            const productName = productNamesList[i];
            const preSignedUrl = await createPresignedUrlForViewing(imageStoreBucket, imageKey);

            // post a request to printify (need to create a printify repository)
            const response = await UploadImageToPrintify(productName, preSignedUrl, this.printifyClient);
            if (response === null) throw new PrintifyError('Failed to get a response from Printify');
            await MoveFileFromThisUncategorizedContainerTo(archiveStoreBucket, imageKey);
            results.push({
                id: response.id,
                file_name: response.file_name,
                height: response.height,
                width: response.width,
                size: response.size,
                mime_type: response.mime_type,
                preview_url: response.preview_url,
                upload_time: response.upload_time
            });
        }

        return res.json({ printifyResources: results });
    }
}

export type CreateImageCategorizationRequest = {
    imageKeys: string;
    productNames: string;
};

export type CreateImageCategorizationResponse = {
    printifyResources: PrintifyImageResource[];
};

export default CategorizeAndUploadController;
