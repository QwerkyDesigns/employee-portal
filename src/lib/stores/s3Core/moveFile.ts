import s3Client from '@/lib/client/s3Client';

export default async function moveFile(srcBucket: string, srcKey: string, destBucket: string, destKey: string) {
    const copyParams = {
        CopySource: `${srcBucket}/${srcKey}`,
        Bucket: destBucket,
        Key: destKey
    };
    await s3Client.copyObject(copyParams).promise();
    await s3Client.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();
}
