import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { ImageName } from '@/lib/models/images/ImageName';
import { ImageSet } from '@/lib/models/images/ImageSet';
import { ImageTransfer } from '@/lib/models/images/ImageTransfer';
import { HeaderKeys } from '@/lib/utils/constants';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import writeFile from '../s3Core/writeFile';
import { imageStoreBucket, uploadOptions } from './imageStoreConstants';
import { ImageLocationDetails } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';
import { Account } from '@prisma/client';
import { CreateImageRecord } from '@/lib/db/CreateImageRecord';

export async function saveDalleUrlsToS3(urls: string[], metaData: ImageBatchMetaData, tags: S3.Tag[] = [], account: Account) {
    const data: ImageLocationDetails[] = [];

    const imageSet = new ImageSet();
    let imageElement = 0;
    for (const url of urls) {
        const response = await fetch(url);
        const imageData = await response.arrayBuffer();
        const imageName = new ImageName(imageSet.id, imageElement, ImageOrigin.Dalle);
        const contentType = response.headers.get(HeaderKeys.ContentType) ?? 'image/png'; // must set image type explicity, image/* is not allowed
        const timeStamp = new Date();
        const timeStampString = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
        const tags: S3.Tag[] = [{ Key: 'DownloadDate', Value: timeStampString }];
        const imageTransfer = new ImageTransfer(imageData, imageName, contentType, tags);


        const imageLocationDetails = await saveDalleImageFileToS3(imageTransfer);
        const key = `${imageTransfer.imageName.getPrefix()}/${imageName.getFileName()}`

        await CreateImageRecord(key, metaData.prompt, account)

        data.push(imageLocationDetails);
        imageElement++;
        console.log(`Downloading ${imageElement} of ${urls.length}`);
    }
    return data;
}

async function saveDalleImageFileToS3(imageTransfer: ImageTransfer) {
    const finalUploadOptions = { ...uploadOptions, tags: imageTransfer.tags };
    const imageName = imageTransfer.imageName.getFileName();
    const data = Buffer.from(imageTransfer.arrayBuffer);
    const imageLocationDetails = await writeFile(
        { name: imageName, data: data, contentType: imageTransfer.contentType },
        finalUploadOptions,
        imageStoreBucket,
        imageTransfer.imageName.getPrefix()
    );
    return imageLocationDetails;
}
