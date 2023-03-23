import { NextApiRequest, NextApiResponse } from 'next';
import { errors, getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { ImageSize } from '../enums/ImageSizes';
import { requestNewDalleImageSet } from '../externalServices/dalle/RequestNewDalleImageSet';
import { saveDalleUrlsToS3 } from '../stores/uncategorizedCreatedImagesStore/SaveFromDalleToS3';
import { ImageLocationDetails } from '@/types/sharedTypes';

class CreateDalleImagesController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, _request, response) => {
            response.status(StatusCodes.InvalidRequest).json(errors([
                error.message
            ]));
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        let { n, size, prompt } = getBody<CreateDalleImagesRequest>(req);

        if (n < 1 || n > 10) {
            throw new ArgumentError('You may only request up to 10 images');
        }

        if (prompt.length > 500) {
            prompt = prompt.slice(0, 500);
        }

        const response = await requestNewDalleImageSet(prompt, n, size);
        const imageLocationdetails = await saveDalleUrlsToS3(response.urls, response.metaData);

        return res.json({
            details: imageLocationdetails
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
