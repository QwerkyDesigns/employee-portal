import s3Client from '@/lib/client/s3Client';
import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import { S3 } from 'aws-sdk';

export default async function listFiles(bucket: string, prefix?: string): Promise<S3.ObjectList> {
    const params = {
        Bucket: bucket,
        Prefix: prefix ?? ''
    };
    try {
        console.log(params);
        const response = await s3Client.listObjects(params).promise();
        return response.Contents ?? [];
    } catch (err) {
        console.log(err);
        throw new S3DownloadError('Failed to list all objects', StatusCodes.ServerError);
    }
}
