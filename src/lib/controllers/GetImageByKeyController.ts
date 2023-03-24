import { NextApiRequest, NextApiResponse } from 'next';
import { getQuery } from 'nextjs-backend-helpers';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import queryString from 'query-string';
import ArgumentError from '../errors/bad-request/ArgumentError';
import createPresignedUrlForViewing from '../stores/s3Core/createPresignedUrlForViewing';
import { imageStoreBucket } from '../stores/uncategorizedCreatedImagesStore/imageStoreConstants';

class GetImageByKeyController extends AuthenticatedBaseController {
    async get(req: NextApiRequest, res: NextApiResponse<GetSingleImageUrlResponse>) {
        const { keys } = getQuery<{ keys: string }>(req);
        const { keys: parsedKey } = queryString.parse(`keys=${keys}`);
        if (parsedKey && typeof parsedKey === 'string') {
            const keys = parsedKey.split(',');
            const urls: string[] = [];
            for (let i = 0; i < keys.length; i++) {
                const url = await createPresignedUrlForViewing(imageStoreBucket, keys[i]);
                urls.push(url);
            }
            const encodedUrls = queryString.stringify({ urls: urls.join(',') });
            const returnable = { urls: encodedUrls };
            return res.json(returnable);
        } else {
            throw new ArgumentError('Could not parse file key param');
        }
    }
}

export type GetSingleImageUrlResponse = {
    urls: string;
};

export default GetImageByKeyController;
