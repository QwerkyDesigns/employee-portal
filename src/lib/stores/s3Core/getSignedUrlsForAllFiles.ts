import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import createPresignedUrlForViewing from './createPresignedUrlForViewing';
import listFiles from './listFiles';

export default async function getSignedUrlsForAllFiles(bucket: string, prefix?: string): Promise<PresignedUrlWithMeta[]> {
    let key = prefix ?? '';
    try {
        const fileObjects = await listFiles(bucket, prefix);
        const keys = fileObjects.map((obj) => obj.Key).filter((k) => k !== undefined && !key.endsWith('meta.txt')) as string[];
        const data = keys.map((k) => {
            const url = createPresignedUrlForViewing(bucket, k);
            return { key: k, url };
        });

        const presignedUrlWithMeta = await Promise.all(
            data.map(async ({ key, url }) => {
                const resolvedUrl = await url;
                return { key, url: resolvedUrl };
            })
        );
        return presignedUrlWithMeta;
    } catch (err) {
        throw new S3DownloadError(`Error retrieving presigned urls`, StatusCodes.ServerError);
    }
}
