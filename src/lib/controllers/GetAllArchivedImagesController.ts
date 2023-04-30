import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllArchivedImages } from '../stores/archivedImageStore/GetAllArchivedImages';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import { Session, getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]"

class GetAllArchivedController extends AuthenticatedBaseController {
    async get(req: NextApiRequest, res: NextApiResponse<GetAllArchivedResponse>) {

        const session = await getServerSession(req, res, authOptions) as Session;
        const email = session.user?.email;
        if (email === null || email === undefined) {
            throw new Error("no session?")
        }
        const allArchivedImages = await getAllArchivedImages(email);

        return res.json({
            imageMetas: allArchivedImages
        });
    }
}

export type GetAllArchivedResponse = {
    imageMetas: PresignedUrlWithMeta[];
};

export default GetAllArchivedController;
