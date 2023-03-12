import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import createPresignedUrlForPosting from '../s3Core/createPresignedUrlForPosting';
import createPresignedUrlForViewing from '../s3Core/createPresignedUrlForViewing';
import { imageStoreBucket } from './imageStoreConstants';

export async function GetPresignedPostUrl(): Promise<{
    presignedUrlForUploading: S3.PresignedPost;
    presignedForViewing: string;
}> {
    const safeFileName = uuidv4();

    const fullPathKey = `${ImageOrigin.Upload}/${safeFileName}`;
    const presignedUrlForUploading = await createPresignedUrlForPosting(imageStoreBucket, fullPathKey);
    const presignedForViewing = await createPresignedUrlForViewing(imageStoreBucket, presignedUrlForUploading.fields.key);
    return { presignedUrlForUploading, presignedForViewing };
}
