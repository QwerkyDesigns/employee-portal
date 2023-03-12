import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { ImageName } from '@/lib/models/images/ImageName';
import { ImageSet } from '@/lib/models/images/ImageSet';
import { ImageTransfer } from '@/lib/models/images/ImageTransfer';
import { HeaderKeys } from '@/lib/utils/constants';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import writeFile from '../s3Core/writeFile';
import writeFiles from '../s3Core/writeFiles';
import { imageStoreBucket, uploadOptions } from './imageStoreConstants';
import { ImageLocationDetails } from '@/types/sharedTypes';
import { S3 } from 'aws-sdk';

// These are a mess. Thought I'd want meta data - was trying to avoid databases -- its time to move the meta to the DB (along with file locations)
// and simplify the heck out of this.
export default async function SaveDalleUrlsToS3(urls: string[], metaData: ImageBatchMetaData, tags: S3.Tag[] = []) {
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

        const imageLocationDetails = await SaveDalleImageFileToS3(imageTransfer);

        data.push(imageLocationDetails);
        imageElement++;
        console.log(`Downloading ${imageElement} of ${urls.length}`);
    }

    const metaFileName = `${imageSet.id}-meta.txt`;
    const serializedMetaData = JSON.stringify(metaData);
    const metaFilePrefix = `${ImageOrigin.Dalle}/${imageSet.id}`;
    await SaveSerializedDataToS3(serializedMetaData, metaFileName, metaFilePrefix);
    return data;
}

async function SaveDalleImageFileToS3(imageTransfer: ImageTransfer) {
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

async function SaveSerializedDataToS3(serializedData: string, fileName: string, prefix: string) {
    const buffer = Buffer.from(serializedData, 'utf-8');
    await writeFiles([{ name: fileName, data: buffer, contentType: 'text/*' }], uploadOptions, imageStoreBucket, prefix);
}
