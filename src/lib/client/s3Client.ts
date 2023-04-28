import { S3 } from 'aws-sdk';
import { env } from '@/env/server.mjs';
const s3Options = {
    accessKeyId: env.QAWS_ACCESS_KEY_ID,
    secretAccessKey: env.QAWS_SECRET_ACCESS_KEY,
    region: env.QAWS_REGION
};

const s3Client = new S3(s3Options);
export default s3Client;
