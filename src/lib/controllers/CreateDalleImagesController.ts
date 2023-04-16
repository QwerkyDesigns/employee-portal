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
            throw new ArgumentError('You may only request up to 10 images');
        }

        if (prompt.length > 500) {
            prompt = prompt.slice(0, 500);
        }
        
        console.log("-------------A")
        const response = await requestNewDalleImageSet(prompt, n, size);
        console.log("-------------B")
        const imageLocationDetails = await saveDalleUrlsToS3(response.urls, response.metaData);
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
