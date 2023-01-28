import { ImageOrigin } from "../enums/ImageOrigin";


export class ImageName {
    private imageSetId: string;
    private imageIndex: string;
    private imageOrigin: ImageOrigin;
    constructor(imageSetId: string, imageIndex: number, imageOrigin: ImageOrigin) {
        this.imageIndex = imageIndex.toString();
        this.imageSetId = imageSetId;
        this.imageOrigin = imageOrigin;
    }

    public getPrefix() {
        return `${this.imageOrigin.toString()}/${this.imageSetId}`;
    }

    public getFileName() {
        return this._formName();
    }

    public getKey_ThePrefixAndFilename() {
        return `${this.getPrefix()}/${this.getFileName}`;
    }

    public getOrigin() {
        return this.imageOrigin;
    }

    private _formName(): string {
        return `${this.imageSetId}-${this.imageIndex}.png`;
    }
}
