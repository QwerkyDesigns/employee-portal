import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { Logger } from 'nextjs-backend-helpers';
import createPresignedUrlForViewing from './createPresignedUrlForViewing';
import listFiles from './listFiles';
import { env } from '@/env/server.mjs';
import { prisma } from '@/lib/client/prisma';
import { GetAllImagesForAccount } from '@/lib/db/GetAllImagesForAccount';
import { ImageState } from '@/lib/enums/ImageState';

const imageBucket = env.IMAGE_STORE_BUCKET;

export default async function getSignedUrlsForAllImageKeys(imageKeys: string[]) {

    const data = imageKeys.map((k) => {
        const url = createPresignedUrlForViewing(imageBucket, k);
        return { key: k, url };
    });
    const presignedUrlWithMeta = await Promise.all(
        data.map(async ({ key, url }) => {
            const resolvedUrl = await url;
            return { key, url: resolvedUrl };
        })
    );
    return presignedUrlWithMeta;
}



// export default async function getSignedUrlsForAllFiles(bucket: string, prefix?: string): Promise<PresignedUrlWithMeta[]> {
//     const key = prefix ?? '';
//     try {
//         const fileObjects = await listFiles(bucket, prefix);
//         const keys = fileObjects.map((obj) => obj.Key).filter((k) => k !== undefined && !key.endsWith('meta.txt')) as string[];
//         const data = keys.map((k) => {
//             const url = createPresignedUrlForViewing(bucket, k);
//             return { key: k, url };
//         });
//         const presignedUrlWithMeta = await Promise.all(
//             data.map(async ({ key, url }) => {
//                 const resolvedUrl = await url;
//                 return { key, url: resolvedUrl };
//             })
//         );
//         return presignedUrlWithMeta;
//     } catch (err) {
//         Logger.error({
//             message: err as string
//         });
//         throw new S3DownloadError('Error retrieving presigned urls', StatusCodes.ServerError);
//     }
// }
