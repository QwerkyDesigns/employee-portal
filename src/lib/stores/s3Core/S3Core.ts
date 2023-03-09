import { StatusCodes } from '@/lib/enums/StatusCodes';
import S3DownloadError from '@/lib/errors/application-errors/S3DownloadError';
import S3UploadError from '@/lib/errors/application-errors/S3UploadError';
import { HeaderKeys } from '@/lib/utils/constants';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';

// TODO: Get these evn vars via the environment object
const s3Options = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
}; // TODO: configure from env

export type CoreFile = { name: string; data: any; contentType: string };
export type ImageLocationDetails = {
  presignedUrl: string;
  name: string;
};

class S3Core {
  private s3: S3;
  public bucketName: string;

  constructor(bucketName: string) {
    this.s3 = new S3(s3Options);
    this.bucketName = bucketName;
  }

  async createPresignedUrlForViewing(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3600,
    };

    return await this.s3.getSignedUrlPromise('getObject', params);
  }

  async createPresignedUrlForPosting(key: string): Promise<S3.PresignedPost> {
    const params: S3.PresignedPost.Params = {
      Bucket: this.bucketName,
      Expires: 3600,
      Fields: {
        key: key,
        [HeaderKeys.ContentType]: 'image/png', // TODO: this will need to be more than just png
        [HeaderKeys.CacheControl]: 'max-age=31536000',
      },
    };
    const url = this.s3.createPresignedPost(params);
    return Promise.resolve(url);
  }

  // prefix would be imageSetId
  async writeFile(
    file: CoreFile,
    uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
    prefix: string
  ): Promise<ImageLocationDetails> {
    const key = `${prefix}/${file.name}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.data,
      ContentType: file.contentType,
      ResponseHeaderOverrides: {
        [HeaderKeys.CacheControl]: 'max-age=31536000',
      },
    };

    const callback = (err: Error, data: ManagedUpload.SendData) => {
      console.log(err);
      throw new S3UploadError(`Error: ${err}... ${JSON.stringify(data)}`);
    };

    await this.s3.upload(params, uploadOptions, callback).promise();
    const presignedUrlForViewing = await this.createPresignedUrlForViewing(key);

    return { name: file.name, presignedUrl: presignedUrlForViewing };
  }

  async writeFiles(
    files: CoreFile[],
    uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
    prefix: string
  ): Promise<ImageLocationDetails[]> {
    const uploadPromises = files.map(async (file) => {
      return await this.writeFile(file, uploadOptions, prefix);
    });
    const imageLocationDetails = await Promise.all(uploadPromises);
    return imageLocationDetails;
  }

  async listFiles(prefix?: string): Promise<S3.ObjectList> {
    const params = {
      Bucket: this.bucketName,
      Prefix: prefix ?? '',
    };
    try {
      const response = await this.s3.listObjects(params).promise();
      return response.Contents ?? [];
    } catch (err) {
      throw new S3DownloadError(
        'Failed to list all objects',
        StatusCodes.ServerError
      );
    }
  }

  async getSignedUrlsForAllFiles(
    prefix?: string
  ): Promise<PresignedUrlWithMeta[]> {
    let key = prefix ?? '';
    try {
      const fileObjects = await this.listFiles(prefix);
      const keys = fileObjects
        .map((obj) => obj.Key)
        .filter(
          (k) => k !== undefined && !key.endsWith('meta.txt')
        ) as string[];
      const data = keys.map((k) => {
        const url = this.createPresignedUrlForViewing(k);
        return { key: k, url };
      });

      const presignedUrlWithMeta = await Promise.all(
        data.map(async ({ key, url }) => {
          const resolvedUrl = await url;
          return { key, url: resolvedUrl };
        })
      );
      return presignedUrlWithMeta;
    } catch (err) {
      throw new S3DownloadError(
        `Error retrieving presigned urls`,
        StatusCodes.ServerError
      );
    }
  }

  async getAllFiles(prefix?: string): Promise<Buffer[]> {
    let key = prefix ?? '';
    try {
      const fileObjects = await this.listFiles(prefix);
      const keys = fileObjects.map((fo) => fo.Key);
      const params = keys.map((key) => {
        return { Bucket: this.bucketName, Key: key } as S3GetObjectRequest;
      });

      const downloadPromise = params.map((param) =>
        this.s3.getObject(param).promise()
      );
      const downloadedFiles = await Promise.all(downloadPromise);
      return downloadedFiles.map((file) => file.Body as Buffer);
    } catch (err) {
      throw new S3DownloadError(
        `Error retrieving file: ${key}`,
        StatusCodes.ServerError
      );
    }
  }

  async getFile(
    fileName: string,
    prefix?: string
  ): Promise<S3.GetObjectOutput> {
    let key;
    if (prefix) {
      key = `${prefix}/{fileName}`;
    } else {
      key = fileName;
    }

    try {
      const params: S3GetObjectRequest = { Bucket: this.bucketName, Key: key };
      const file = await this.s3.getObject(params).promise();
      return file;
    } catch (err) {
      throw new S3DownloadError(
        `Error retreivig file: ${key}`,
        StatusCodes.ServerError
      );
    }
  }

  async moveFile(
    srcBucket: string,
    srcKey: string,
    destBucket: string,
    destKey: string
  ) {
    const copyParams = {
      CopySource: `${srcBucket}/${srcKey}`,
      Bucket: destBucket,
      Key: destKey,
    };
    await this.s3.copyObject(copyParams).promise();
    await this.s3.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();
  }

  async deleteFile(key: string) {
    await this.s3.deleteObject({ Bucket: this.bucketName, Key: key }).promise();
  }
}

export type PresignedUrlWithMeta = {
  url: string;
  key: string;
};

export type S3GetObjectRequest = {
  Bucket: string;
  Key: string;
};

export default S3Core;
