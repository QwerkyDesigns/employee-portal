import { NextApiRequest, NextApiResponse } from 'next';
import { getQuery } from 'nextjs-backend-helpers';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { ImageOrigin } from '../enums/ImageOrigin';
import getAllUncategorizedImages from '../stores/uncategorizedCreatedImagesStore/RetrieveAllTransfers';
import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { Session, getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]"

const parseImageOrigin = (originQueryParam: string) => {
    switch (originQueryParam) {
    case ImageOrigin.Dalle:
        return ImageOrigin.Dalle;
    case ImageOrigin.Upload:
        return ImageOrigin.Upload;
    default:
        throw new ArgumentError(`Query must be provided, one of '${ImageOrigin.Dalle}' or '${ImageOrigin.Upload}'`);
    }
};

class GetAllUntransferredController extends AuthenticatedBaseController {
    async get(req: NextApiRequest, res: NextApiResponse<GetAllUntransferredResponse>) {
        const { origin } = getQuery<{ origin: string }>(req);
        const imageOrigin = parseImageOrigin(origin);

        const session = await getServerSession(req, res, authOptions) as Session;
        const email = session.user?.email;
        if (email === null || email === undefined) {
            throw new Error("no session?")
        }

        const allViewingUrls = await getAllUncategorizedImages(email, imageOrigin);
        return res.json({ imageMetas: allViewingUrls });
    }
}

export type GetAllUntransferredResponse = {
    imageMetas: PresignedUrlWithMeta[];
};

export type UnCategorizedImageMeta = {
    url: string;
    key: string;
};

export default GetAllUntransferredController;
