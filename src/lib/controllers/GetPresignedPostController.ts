import { AuthenticatedBaseController } from '@/lib/controllers/base/AuthenticatedBaseController';
import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';
import UnCategorizedImagesStore from '../stores/UncategorizedImagesStore';

export class GetPresignedPost extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        const repo = new UnCategorizedImagesStore();
        const result = await repo.GetPresignedPostUrl();
        return res.json({ ...result });
    }
}

export type GetPresignedPostResponse = {
    presignedUrlForUploading: S3.PresignedPost;
    presignedForViewing: string;
};
