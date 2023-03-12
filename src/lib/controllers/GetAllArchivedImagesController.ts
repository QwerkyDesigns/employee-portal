import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import { GetAllArchivedImages } from '../stores/archivedImageStore/GetAllArchivedImages';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

class GetAllArchivedController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse<GetAllArchivedResponse>) {
        const allViewingUrls = await GetAllArchivedImages();
        return res.json({
            imageMetas: allViewingUrls
        });
    }
}

export type GetAllArchivedResponse = {
    imageMetas: PresignedUrlWithMeta[];
};

export default GetAllArchivedController;
