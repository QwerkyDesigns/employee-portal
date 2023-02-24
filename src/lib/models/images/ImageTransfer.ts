import S3 from "aws-sdk/clients/s3";
import { ImageName } from "./ImageName";


export class ImageTransfer {
    public arrayBuffer: ArrayBuffer;
    public imageName: ImageName;
    public contentType: string;
    public tags: S3.Tag[];
    constructor(
        arrayBuffer: ArrayBuffer,
        imageName: ImageName,
        contentType: string,
        tags: S3.Tag[]
    ) {
        this.arrayBuffer = arrayBuffer;
        this.imageName = imageName;
        this.contentType = contentType;
        this.tags = tags;
    }
}
