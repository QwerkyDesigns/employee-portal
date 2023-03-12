import s3Client from '@/lib/client/s3Client';

export default async function createPresignedUrlForViewing(bucket: string, key: string): Promise<string> {
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: 3600
    };
    return await s3Client.getSignedUrlPromise('getObject', params);
}
