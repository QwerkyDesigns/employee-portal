import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllArchivedImages } from '../stores/archivedImageStore/GetAllArchivedImages';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

class GetAllArchivedController extends AuthenticatedBaseController {
    async get(_req: NextApiRequest, res: NextApiResponse<GetAllArchivedResponse>) {
        return res.json({
            imageMetas: await getAllArchivedImages()
        });
    }
}

export type GetAllArchivedResponse = {
    imageMetas: PresignedUrlWithMeta[];
};

export default GetAllArchivedController;
