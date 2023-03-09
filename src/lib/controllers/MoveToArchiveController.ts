import { NextApiRequest, NextApiResponse } from 'next';
import { getBody, getQuery } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import UnCategorizedImagesStore from '../stores/UncategorizedImagesStore';
import ArchivedImagesStore from '../stores/ArchivedImagesStore';

class MoveToArchiveController extends AuthenticatedBaseController {
    private uncategorizedS3BucketRepository = new UnCategorizedImagesStore();
    private archiveStore = new ArchivedImagesStore();

    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message]
            });
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<MoveToArchiveResponse>) {
        const { imageKeys } = getQuery<MoveToArchiveRequest>(req);
        await this.uncategorizedS3BucketRepository.MoveFileFromThisContainerTo(this.archiveStore.bucketName, imageKeys);
        return res.json({});
    }
}

export type MoveToArchiveRequest = {
    imageKeys: string;
};

export type MoveToArchiveResponse = {};

export default MoveToArchiveController;
