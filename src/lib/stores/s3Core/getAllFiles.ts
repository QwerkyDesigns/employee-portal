import s3Client from '@/lib/client/s3Client';
import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import { S3GetObjectRequest } from '@/types/sharedTypes';
import { Logger } from 'nextjs-backend-helpers';
import listFiles from './listFiles';

export default async function getAllFiles(bucket: string, prefix?: string): Promise<Buffer[]> {
    const key = prefix ?? '';
    try {
        const fileObjects = await listFiles(bucket, prefix);
        const keys = fileObjects.map((fo) => fo.Key);
        const params = keys.map((key) => {
            return { Bucket: bucket, Key: key } as S3GetObjectRequest;
        });

        const downloadPromise = params.map((param) => s3Client.getObject(param).promise());
        const downloadedFiles = await Promise.all(downloadPromise);
        return downloadedFiles.map((file) => file.Body as Buffer);
    } catch (err) {
        Logger.error({ message: err as string });
        console.log(err);
        throw new S3DownloadError(`Error retrieving file: ${key}`, StatusCodes.ServerError);
    }
}
