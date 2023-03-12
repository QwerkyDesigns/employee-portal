import s3Client from '@/lib/client/s3Client';
import { HeaderKeys } from '@/lib/utils/constants';
import { S3 } from 'aws-sdk';

export default async function createPresignedUrlForPosting(bucket: string, key: string): Promise<S3.PresignedPost> {
    const params: S3.PresignedPost.Params = {
        Bucket: bucket,
        Expires: 3600,
        Fields: {
            key: key,
            [HeaderKeys.ContentType]: 'image/png',
            [HeaderKeys.CacheControl]: 'max-age=31536000'
        }
    };
    const url = s3Client.createPresignedPost(params);
    return Promise.resolve(url);
}
