import { NextApiRequest, NextApiResponse } from 'next';
import { errors, getQuery } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { moveFileFromThisUncategorizedContainerTo } from '../stores/uncategorizedCreatedImagesStore/MoveFileFromThisContainerTo';
import { archiveStoreBucket } from '../stores/archivedImageStore/archivedImageStoreConstants';

class MoveToArchiveController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest)
                .json(errors([error.message]))
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<MoveToArchiveResponse>) {
        const { imageKeys } = getQuery<MoveToArchiveRequest>(req);
        await moveFileFromThisUncategorizedContainerTo(archiveStoreBucket, imageKeys);
        return res.json({});
    }
}

export type MoveToArchiveRequest = {
    imageKeys: string;
};

export type MoveToArchiveResponse = {};

export default MoveToArchiveController;
