import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { ImageSize } from '../enums/ImageSizes';
import RequestNewDalleImageSet from '../externalServices/dalle/RequestNewDalleImageSet';
import SaveDalleUrlsToS3 from '../stores/uncategorizedCreatedImagesStore/SaveFromDalleToS3';
import { ImageLocationDetails } from '@/types/sharedTypes';

class GenerateIdeasController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message]
            });
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        const { prompt } = getBody<GenerateIdeasRequest>(req);

        const response = await RequestNewDalleImageSet(prompt, n, size);

        const imageLocationdetails = await SaveDalleUrlsToS3(response.urls, response.metaData);
        return res.json({
            details: imageLocationdetails
        });
    }
}

export type GenerateIdeasRequest = {
    prompt: string;
};

export type GenerateIdeasResponse = {
    ideas: string[];
};

export default GenerateIdeasController;
