import { NextApiRequest, NextApiResponse } from 'next';
import { errors, getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { ImageSize } from '../enums/ImageSizes';
import { ImageLocationDetails } from '@/types/sharedTypes';
import { requestNewDalleImageSet } from '../externalServices/openAi/dalle/RequestNewDalleImageSet';
import { saveDalleUrlsToS3 } from '../stores/uncategorizedCreatedImagesStore/SaveFromDalleToS3';
import { Logger } from 'nextjs-backend-helpers';
import { Session, getServerSession } from 'next-auth';
import { GetAccountByEmail } from '../db/GetAccount';
import authOptions from "@/pages/api/auth/[...nextauth]"

class CreateDalleImagesController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, _request, response) => {
            response.status(StatusCodes.InvalidRequest).json(errors([error.message]));
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        const { n, size } = getBody<CreateDalleImagesRequest>(req);
        let { prompt } = getBody<CreateDalleImagesRequest>(req);

        if (n < 1 || n > 10) {
            throw new ArgumentError('You may only request between 1 and 10 images');
        }

        if (prompt.length > 500) {
            prompt = prompt.slice(0, 500);
        }

        const response = await requestNewDalleImageSet(prompt, n, size);
        const session = await getServerSession(req, res, authOptions) as Session;
        const email = session?.user?.email;
        if (email === null || email === undefined) {
            throw new Error("Could not find session");
        }

        const account = await GetAccountByEmail(email);

        const imageLocationDetails = await saveDalleUrlsToS3(response.urls, response.metaData, [], account);
        Logger.debug({
            message: "Failed somewhere",
            imageLocationDetails
        });
        return res.json({
            details: imageLocationDetails
        });
    }
}

export type CreateDalleImagesRequest = {
    n: number;
    size: ImageSize;
    prompt: string;
};

export type CreateDalleImagesResponse = {
    details: ImageLocationDetails[];
};

export default CreateDalleImagesController;
