import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import DataContainers from '@/lib/models/data-containers/S3DataContainers';
import { ImageName } from '@/lib/models/images/ImageName';
import { ImageSet } from '@/lib/models/images/ImageSet';
import { ImageTransfer } from '@/lib/models/images/ImageTransfer';
import { HeaderKeys } from '@/lib/utils/constants';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import S3Core, { ImageLocationDetails } from './s3Core/S3Core';

export interface IMoveFromHereToThere {
  MoveFileFromThisContainerTo: (
    targetBucket: string,
    targetKey: string
  ) => void;
}

export class UnCategorizedImagesStore
  extends S3Core
  implements IMoveFromHereToThere
{
  constructor() {
    super(DataContainers.CurrentDataContainer().InitialTransfersContainer);
  }

  private uploadOptions: S3.ManagedUpload.ManagedUploadOptions = {
    queueSize: 10,
  };

  public async RetrieveAllTransfers(imageOrigin?: ImageOrigin) {
    const viewingUrls = await this.getSignedUrlsForAllFiles(imageOrigin ?? '');
    return viewingUrls;
  }

  public async SaveDalleUrlsToS3(
    urls: string[],
    metaData: ImageBatchMetaData,
    tags: S3.Tag[] = []
  ) {
    const data: ImageLocationDetails[] = [];

    const imageSet = new ImageSet();
    let imageElement = 0;
    for (const url of urls) {
      const response = await fetch(url);
      const imageData = await response.arrayBuffer();
      const imageName = new ImageName(
        imageSet.id,
        imageElement,
        ImageOrigin.Dalle
      );
      const contentType =
        response.headers.get(HeaderKeys.ContentType) ?? 'image/png'; // must set image type explicity, image/* is not allowed
      const timeStamp = new Date();
      const timeStampString = timeStamp
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const tags: S3.Tag[] = [{ Key: 'DownloadDate', Value: timeStampString }];
      const imageTransfer = new ImageTransfer(
        imageData,
        imageName,
        contentType,
        tags
      );

      const imageLocationDetails = await this.SaveDalleImageFileToS3(
        imageTransfer
      );

      data.push(imageLocationDetails);
      imageElement++;
      console.log(`Downloading ${imageElement} of ${urls.length}`);
    }

    const metaFileName = `${imageSet.id}-meta.txt`;
    const serializedMetaData = JSON.stringify(metaData);
    const metaFilePrefix = `${ImageOrigin.Dalle}/${imageSet.id}`;
    await this.SaveSerializedDataToS3(
      serializedMetaData,
      metaFileName,
      metaFilePrefix
    );
    return data;
  }

  private async SaveSerializedDataToS3(
    serializedData: string,
    fileName: string,
    prefix: string
  ) {
    const buffer = Buffer.from(serializedData, 'utf-8');
    await this.writeFiles(
      [{ name: fileName, data: buffer, contentType: 'text/*' }],
      this.uploadOptions,
      prefix
    );
  }

  private async SaveDalleImageFileToS3(imageTransfer: ImageTransfer) {
    this.uploadOptions.tags = imageTransfer.tags;

    const imageName = imageTransfer.imageName.getFileName();
    const data = Buffer.from(imageTransfer.arrayBuffer);
    const imageLocationDetails = await this.writeFile(
      { name: imageName, data: data, contentType: imageTransfer.contentType },
      this.uploadOptions,
      imageTransfer.imageName.getPrefix()
    );
    return imageLocationDetails;
  }

  // This is for image uploads
  public async GetPresignedPostUrl(): Promise<{
    presignedUrlForUploading: S3.PresignedPost;
    presignedForViewing: string;
  }> {
    const safeFileName = uuidv4();

    const fullPathKey = `${ImageOrigin.Upload}/${safeFileName}`;
    const presignedUrlForUploading = await this.createPresignedUrlForPosting(
      fullPathKey
    );
    const presignedForViewing = await this.createPresignedUrlForViewing(
      presignedUrlForUploading.fields.key
    );
    return { presignedUrlForUploading, presignedForViewing };
  }

  public async MoveFileFromThisContainerTo(
    targetBucket: string,
    targetKey: string
  ) {
    await this.moveFile(this.bucketName, targetKey, targetBucket, targetKey);
  }
}

export default UnCategorizedImagesStore;
