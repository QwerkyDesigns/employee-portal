import { NextApiRequest, NextApiResponse } from 'next';
import { errors, getQuery } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { moveFileFromThisUncategorizedContainerTo } from '../stores/uncategorizedCreatedImagesStore/MoveFileFromThisContainerTo';
import { prisma } from '../client/prisma';
import { ImageState } from '../enums/ImageState';

class MoveToArchiveController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json(errors([error.message]));
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<MoveToArchiveResponse>) {
        const { imageKeys } = getQuery<MoveToArchiveRequest>(req);

        for (let i = 0; i < imageKeys.length; i++) {
            const imageKey = imageKeys[i]
            await prisma.images.update({
                where: {
                    imageKey
                },
                data: {
                    imageState: ImageState.Archived.toString()
                }
            })
        }

        return res.json({});
    }
}

export type MoveToArchiveRequest = {
    imageKeys: string;
};

export type MoveToArchiveResponse = object;

export default MoveToArchiveController;
