import s3Client from '@/lib/client/s3Client';

export default async function deleteFile(bucket: string, key: string) {
    await s3Client.deleteObject({ Bucket: bucket, Key: key }).promise();
}
