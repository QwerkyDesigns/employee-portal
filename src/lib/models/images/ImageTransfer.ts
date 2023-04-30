import S3 from 'aws-sdk/clients/s3';

export class ImageTransfer {
    public arrayBuffer: ArrayBuffer;
    public imageKey: string;
    public contentType: string;
    public tags: S3.Tag[];
    constructor(arrayBuffer: ArrayBuffer, imageKey: string, contentType: string, tags: S3.Tag[]) {
        this.arrayBuffer = arrayBuffer;
        this.imageKey = imageKey;
        this.contentType = contentType;
        this.tags = tags;
    }
}
