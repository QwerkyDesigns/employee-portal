import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { ImageTransfer } from '@/lib/models/images/ImageTransfer';
import { HeaderKeys } from '@/lib/utils/constants';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import writeFile from '../s3Core/writeFile';
import { imageStoreBucket, uploadOptions } from './imageStoreConstants';
import { CoreFile, ImageLocationDetails } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';
import { Account } from '@prisma/client';
import { CreateImageRecord } from '@/lib/db/CreateImageRecord';
import { v4 as uuidv4 } from 'uuid';

export async function saveDalleUrlsToS3(urls: string[], metaData: ImageBatchMetaData, tags: S3.Tag[] = [], account: Account) {
    const data: ImageLocationDetails[] = [];
    let imageElement = 0;
    for (const url of urls) {
        const response = await fetch(url);
        const imageData = await response.arrayBuffer();
        const contentType = response.headers.get(HeaderKeys.ContentType) ?? 'image/png'; // must set image type explicity, image/* is not allowed
        const timeStamp = new Date();
        const timeStampString = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
        const finalTags: S3.Tag[] = [...tags, { Key: 'DownloadDate', Value: timeStampString }];

        const imageKey = uuidv4();
        const imageTransfer = new ImageTransfer(imageData, imageKey, contentType, finalTags);
        const imageLocationDetails = await saveDalleImageFileToS3(imageTransfer);
        await CreateImageRecord(imageKey, metaData.prompt, ImageOrigin.Dalle, account)

        data.push(imageLocationDetails);
        imageElement++;
        console.log(`Downloading ${imageElement} of ${urls.length}`);
    }
    return data;
}

async function saveDalleImageFileToS3(imageTransfer: ImageTransfer) {
    const finalUploadOptions = { ...uploadOptions, tags: imageTransfer.tags };
    const data = Buffer.from(imageTransfer.arrayBuffer);

    const coreFile: CoreFile = { key: imageTransfer.imageKey, data, contentType: imageTransfer.contentType };

    const imageLocationDetails = await writeFile(
        coreFile,
        finalUploadOptions,
        imageStoreBucket,
    );
    return imageLocationDetails;
}
