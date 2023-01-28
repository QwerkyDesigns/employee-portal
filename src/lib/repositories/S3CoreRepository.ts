
import { StatusCodes } from "@/lib/enums/StatusCodes";
import { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import S3DownloadError from "../errors/application-errors/S3DownloadError";
import S3UploadError from "../errors/application-errors/S3UploadError";

// TODO: Get these evn vars via the environment object
const s3Options = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}; // TODO: configure from env

type CoreFile = { name: string; data: Buffer; contentType: string };

class S3CoreRepository {
    private s3: S3;
    private bucketName: string;

    constructor(bucketName: string) {
        this.s3 = new S3(s3Options);
        this.bucketName = bucketName;
    }

    // prefix would be imageSetId
    async writeFile(
        file: CoreFile,
        uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
        prefix: string
    ) {
        const params = {
            Bucket: this.bucketName,
            Key: `${prefix}/${file.name}`,
            Body: file.data,
            ContentType: file.contentType,
        };

        const callback = (err: Error, data: ManagedUpload.SendData) => {
            console.log(err);
            throw new S3UploadError(`Error: ${err}... ${JSON.stringify(data)}`);
        };

        await this.s3.upload(params, uploadOptions, callback).promise();
    }

    async writeFiles(
        files: CoreFile[],
        uploadOptions: S3.ManagedUpload.ManagedUploadOptions,
        prefix: string
    ) {
        const uploadPromises = files.map(async (file) => {
            await this.writeFile(file, uploadOptions, prefix);
        });
        await Promise.all(uploadPromises);
    }

    async listFiles(prefix?: string): Promise<S3.ObjectList> {
        const params = {
            Bucket: this.bucketName,
            Prefix: prefix ?? "",
        };
        try {
            const response = await this.s3.listObjects(params).promise();
            return response.Contents ?? [];
        } catch (err) {
            throw new S3DownloadError("Failed to list all objects", StatusCodes.ServerError);
        }
    }

    async getAllFiles( prefix?: string): Promise<Buffer[]> {
        let key = prefix ?? "";
        try {
            const fileObjects = await this.listFiles(prefix);
            const keys = fileObjects.map((fo) => fo.Key);
            const params = keys.map((key) => {
                return { Bucket: this.bucketName, Key: key } as S3GetObjectRequest;
            });

            const downloadPromise = params.map((param) => this.s3.getObject(param).promise());
            const downloadedFiles = await Promise.all(downloadPromise);
            return downloadedFiles.map((file) => file.Body as Buffer);
        } catch (err) {
            throw new S3DownloadError(`Error retreivig file: ${key}`, StatusCodes.ServerError);
        }
    }

    async getFile(fileName: string, prefix?: string): Promise<S3.GetObjectOutput> {
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
            throw new S3DownloadError(`Error retreivig file: ${key}`, StatusCodes.ServerError);
        }
    }

    async moveFile(srcBucket: string, srcKey: string, destBucket: string, destKey: string) {
        const copyParams = {
            CopySource: `${srcBucket}/${srcKey}`,
            Bucket: destBucket,
            Key: destKey,
        };
        await this.s3.copyObject(copyParams).promise();
        await this.s3.deleteObject({ Bucket: srcBucket, Key: srcKey }).promise();
    }
}
interface S3GetObjectRequest {
    Bucket: string;
    Key: string;
}

interface S3GetObjectResponse {
    Body: any;
    ContentType: string;
}

export default S3CoreRepository;
