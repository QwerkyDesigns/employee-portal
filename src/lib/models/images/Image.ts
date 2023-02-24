
export class Image {
    public arrayBuffer: ArrayBuffer;
    public imageId: string;
    constructor(imageId: string, arrayBuffer: ArrayBuffer) {
        this.imageId = imageId;
        this.arrayBuffer = arrayBuffer;
    }
}
