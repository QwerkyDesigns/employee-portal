import { CoreFile, ImageLocationDetails } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';
import writeFile from './writeFile';

export default async function writeFiles(
    files: CoreFile[],
    uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
    bucket: string,
    prefix: string
): Promise<ImageLocationDetails[]> {
    const uploadPromises = files.map(async (file) => {
        return await writeFile(file, uploadOptions, bucket, prefix);
    });
    const imageLocationDetails = await Promise.all(uploadPromises);
    return imageLocationDetails;
}
