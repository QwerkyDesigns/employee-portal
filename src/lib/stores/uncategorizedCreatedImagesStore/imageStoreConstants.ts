import { env } from '@/env/server.mjs';
import { S3 } from 'aws-sdk';

export const imageStoreBucket = env.IMAGE_STORE_BUCKET as string;
export const uploadOptions: S3.ManagedUpload.ManagedUploadOptions = {
    queueSize: 10
};
