import { ImageBatchMetaData } from "@/types/ImageBatchmetaData";
import S3 from "aws-sdk/clients/s3";
const s3Options = {}; // TODO: configure from env
const bucketName = "TODOBUCKETCONFIGURATION";
import { v4 as uuidv4 } from "uuid";

export class RepositoryS3Images {
  private s3 = new S3(s3Options);

  constructor() {}

  public async SaveImageSetToS3(urls: string[], metaData: ImageBatchMetaData) {
    var imageElement = 0;
    const imageSet = uuidv4();

    for (const url of urls) {
      const response = await fetch(url);
      const imageData = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") ?? "image/*";
      const imageName = `${imageSet}-{imageElement}.png`;

      await this.SaveImageDataToS3(imageData, contentType, imageName);
      imageElement++;
    }

    const metaFileName = `${imageSet}-meta.txt`;
    await this.SaveImageSetMeta(metaData, metaFileName);
  }

  private async SaveImageDataToS3(
    imageData: ArrayBuffer,
    imageContentType: string,
    imageName: string
  ) {
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: imageData,
      ContentType: imageContentType,
    };

    await this.s3.upload(params).promise();
  }

  private async SaveImageSetMeta(
    metaData: ImageBatchMetaData,
    fileName: string
  ) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: metaData,
      ContentType: "text/*",
    };

    await this.s3.upload(params).promise();
  }
}
