import DataContainers from "@/lib/models/data-containers/S3DataContainers";
import { ImageBatchMetaData } from "@/types/ImageBatchmetaData";
import S3 from "aws-sdk/clients/s3";
import { ImageOrigin } from "../enums/ImageOrigin";
import { ImageName } from "../models/images/ImageName";
import { ImageSet } from "../models/images/ImageSet";
import { ImageTransfer } from "../models/images/ImageTransfer";
import { v4 as uuidv4 } from "uuid";

import S3CoreRepository, { CoreFile, ImageLocationDetails } from "./S3CoreRepository";
import { HeaderKeys } from "../utils/constants";

export class InitialTransfersRepository extends S3CoreRepository {
    constructor() {
        super(DataContainers.CurrentDataContainer().InitialTransfersContainer);
    }

    private uploadOptions: S3.ManagedUpload.ManagedUploadOptions = {
        queueSize: 10,
    };
    public async RetrieveAllTransfers(imageOrigin?: ImageOrigin) {
        const files = await this.getAllFiles(imageOrigin ?? "");
        return files;
    }

    public async SaveDalleUrlsToS3(urls: string[], metaData: ImageBatchMetaData, tags: S3.Tag[] = []) {
        const data: ImageLocationDetails[] = [];

        const imageSet = new ImageSet();
        let imageElement = 0;
        for (const url of urls) {
            const response = await fetch(url);
            const imageData = await response.arrayBuffer();
            const imageName = new ImageName(imageSet.id, imageElement, ImageOrigin.Dalle);
            const contentType = response.headers.get(HeaderKeys.ContentType) ?? "image/png";
            const timeStamp = new Date();
            const timeStampString = timeStamp.toISOString().slice(0, 19).replace("T", " ");
            const tags: S3.Tag[] = [{ Key: "DownloadDate", Value: timeStampString }];
            const imageTransfer = new ImageTransfer(imageData, imageName, contentType, tags);

            const imageLocationDetails = await this.SaveImageFileToS3(imageTransfer, this.uploadOptions);

            data.push(imageLocationDetails);
            imageElement++;
            console.log(`Downloading ${imageElement} of ${urls.length}`);
        }

        const metaFileName = `${imageSet.id}-meta.txt`;
        const serializedMetaData = JSON.stringify(metaData);
        await this.SaveSerializedDataToS3(serializedMetaData, metaFileName, this.uploadOptions);
        return data;
    }

    private async SaveImageFileToS3(
        imageTransfer: ImageTransfer,
        uploadOptions: S3.ManagedUpload.ManagedUploadOptions
    ) {
        uploadOptions.tags = imageTransfer.tags;

        const imageName = imageTransfer.imageName.getFileName();
        const data = Buffer.from(imageTransfer.arrayBuffer);
        const imageLocationDetails = await this.writeFile(
            { name: imageName, data: data, contentType: imageTransfer.contentType },
            uploadOptions,
            imageTransfer.imageName.getPrefix()
        );
        return imageLocationDetails;
    }

    public async GetPresignedPostUrl(): Promise<{
        presignedUrlForUploading: S3.PresignedPost;
        presignedForViewing: string;
    }> {
        const safeFileName = uuidv4();
        const prefix = "uploads";

        const fullPathKey = `${prefix}/${safeFileName}`;
        const presignedUrlForUploading = await this.createPresignedUrlForPosting(fullPathKey);
        const presignedForViewing = await this.createPresignedUrlForViewing(presignedUrlForUploading.fields.key);
        return { presignedUrlForUploading, presignedForViewing };
    }

    private async SaveSerializedDataToS3(
        serializedData: string,
        fileName: string,
        uploadOptions: S3.ManagedUpload.ManagedUploadOptions
    ) {
        const buffer = Buffer.from(serializedData, "utf-8");
        await this.writeFiles([{ name: fileName, data: buffer, contentType: "text/*" }], uploadOptions, fileName);
    }
}

export default InitialTransfersRepository;
