import s3Client from '@/lib/client/s3Client';
import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import { S3GetObjectRequest } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';

export async function getFile(fileName: string, bucket: string, prefix?: string): Promise<S3.GetObjectOutput> {
    let key;
    if (prefix) {
        key = `${prefix}/{fileName}`;
    } else {
        key = fileName;
    }

    try {
        const params: S3GetObjectRequest = { Bucket: bucket, Key: key };
        const file = await s3Client.getObject(params).promise();
        return file;
    } catch (err) {
        throw new S3DownloadError(`Error retreivig file: ${key}`, StatusCodes.ServerError);
    }
}
