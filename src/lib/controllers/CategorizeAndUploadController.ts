import { NextApiRequest, NextApiResponse } from 'next';
import { errors, getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { PrintifyImageResource } from '../externalServices/printify/UploadImageToPrintify';
import uploadImageToPrintify from '../externalServices/printify/UploadImageToPrintify';
import createPresignedUrlForViewing from '../stores/s3Core/createPresignedUrlForViewing';
import { imageStoreBucket } from '../stores/uncategorizedCreatedImagesStore/imageStoreConstants';
import PrintifyError from '../errors/application-errors/PrintifyError';
import { prisma } from '../client/prisma';
import printifyClient from '../client/printifyClient';
import PrintifyApiKeyNotRegisteredError from '../errors/bad-request/PrintifyApiKeyNotRegisteredError';
import { ExternalServices } from '../enums/ExternalServices';
import { Session, getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]"
import { ImageState } from '../enums/ImageState';

const tryGetPrintifyApiKey = async (emailAddress: string): Promise<string | undefined> => {
    const user = await prisma.user.findUnique({
        where: {
            email: emailAddress
        }
    });
    if (user === null) return undefined;

    const accounts = await prisma.account.findMany({
        where: {
            userId: user.id
        }
    });
    if (accounts.length !== 1) return undefined;
    const account = accounts[0];

    const externalServicesRecordId = account?.externalServicesId;
    if (externalServicesRecordId === null) return undefined;
    const record = await prisma.externalServiceKeys.findUnique({
        where: {
            id: externalServicesRecordId
        }
    });
    const apiKey = record?.printifyApiKey;
    return apiKey;
};

// TODO: Manual for now :shrugs:
export async function categorizeFile(imageKey: string, friendlyName: string, preSignedUrl: string, targets: string[], session: Session) {
    let categorized = false;

    if (targets.includes(ExternalServices.Printify.toString())) {
        const email = session.user?.email;
        if (email === undefined || email === null) {
            throw new Error("Email not found - is there a session?")
        }
        const printifyApiKey = await tryGetPrintifyApiKey(email);
        if (printifyApiKey === undefined) {
            throw new PrintifyApiKeyNotRegisteredError('Your account does not have a registered Printify Api Key. Please set one in your account settings.');
        }
        const pClient = printifyClient(printifyApiKey);
        const response = await uploadImageToPrintify(friendlyName, preSignedUrl, pClient);
        if (response === null) throw new PrintifyError('Failed to get a response from Printify');
        categorized = true;
    }

    if (categorized === true) {
        await prisma.images.update({
            where: {
                storageKey: imageKey
            },
            data: {
                imageState: ImageState.Sent.toString()
            }
        })
    }
}

class CategorizeAndUploadController extends AuthenticatedBaseController {

    constructor() {
        super();
        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json(errors([error.message]));
        });

        this.rescue(PrintifyApiKeyNotRegisteredError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json(errors([error.message]));
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<CreateImageCategorizationResponse>) {
        const { imageKeys, friendlyNames, targets } = getBody<CreateImageCategorizationRequest>(req);
        const session = await getServerSession(req, res, authOptions) as Session;

        const imageKeyList = imageKeys.split(',');
        const friendlyNamesList = friendlyNames.split(',');

        for (let i = 0; i < imageKeyList.length; i++) {
            const imageKey = imageKeyList[i];
            const friendlyName = friendlyNamesList[i];
            const preSignedUrl = await createPresignedUrlForViewing(imageStoreBucket, imageKey);

            // post a request to printify (need to create a printify repository)
            // const response = await uploadImageToPrintify(friendlyName, preSignedUrl, this.printifyClient);
            // if (response === null) throw new PrintifyError('Failed to get a response from Printify');
            // await moveFileFromThisUncategorizedContainerTo(archiveStoreBucket, imageKey);

            await categorizeFile(imageKey, friendlyName, preSignedUrl, targets, session)
        }

        return res.json({});
    }
}

export type CreateImageCategorizationRequest = {
    imageKeys: string;
    friendlyNames: string;
    targets: string[]
};

export type CreateImageCategorizationResponse = {
    printifyResources: PrintifyImageResource[];
};

export default CategorizeAndUploadController;
