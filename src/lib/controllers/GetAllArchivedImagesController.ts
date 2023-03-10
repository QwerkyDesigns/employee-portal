import { NextApiRequest, NextApiResponse } from 'next';
import ArchivedImagesStore from '../stores/ArchivedImagesStore';
import { PresignedUrlWithMeta } from '../stores/s3Core/S3Core';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

class GetAllArchivedController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse<GetAllArchivedResponse>) {
        const repo = new ArchivedImagesStore();

        const allViewingUrls = await repo.GetAllArchivedImages();

        return res.json({
            imageMetas: allViewingUrls
        });
    }
}

export type GetAllArchivedResponse = {
    imageMetas: PresignedUrlWithMeta[];
};

export default GetAllArchivedController;
