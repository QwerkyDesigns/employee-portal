import s3Client from '@/lib/client/s3Client';
import S3UploadError from '@/lib/errors/application-errors/S3UploadError';
import { HeaderKeys } from '@/lib/utils/constants';
import { CoreFile, ImageLocationDetails } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import createPresignedUrlForViewing from './createPresignedUrlForViewing';

export default async function writeFile(
    file: CoreFile,
    uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
    bucket: string,
    prefix?: string
): Promise<ImageLocationDetails> {

    let key;
    if (prefix) {
        key = `${prefix}/${file.key}`;
    } else {
        key = file.key
    }

    const params = {
        Bucket: bucket,
        Key: key,
        Body: file.data,
        ContentType: file.contentType,
        ResponseHeaderOverrides: {
            [HeaderKeys.CacheControl]: 'max-age=31536000'
        }
    };

    const callback = (err: Error, data: ManagedUpload.SendData) => {
        console.log(err);
        throw new S3UploadError(`Error: ${err}... ${JSON.stringify(data)}`);
    };

    try {
        await s3Client.upload(params, uploadOptions, callback).promise();
        const presignedUrlForViewing = await createPresignedUrlForViewing(bucket, key);
        return { key: file.key, presignedUrl: presignedUrlForViewing };
    } catch (err: any) {
        console.log(err);
        return { key: '', presignedUrl: '' };
    }
}
