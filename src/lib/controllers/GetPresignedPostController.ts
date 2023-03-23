import { AuthenticatedBaseController } from '@/lib/controllers/base/AuthenticatedBaseController';
import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPresignedPostUrl } from '../stores/uncategorizedCreatedImagesStore/GetPresignedPostUrl';

export class GetPresignedPost extends AuthenticatedBaseController {
    async post(_req: NextApiRequest, res: NextApiResponse) {
        const result = await getPresignedPostUrl();
        return res.json({ ...result });
    }
}

export type GetPresignedPostResponse = {
    presignedUrlForUploading: S3.PresignedPost;
    presignedForViewing: string;
};
