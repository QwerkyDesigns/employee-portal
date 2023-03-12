import { v4 as uuidv4 } from 'uuid';
import { Image } from './Image';

export class ImageSet {
    public imageSet: Image[] = [];
    public id: string;
    constructor() {
        this.id = uuidv4();
    }

    public AddImage(image: Image) {
        this.imageSet.push(image);
    }

    public GetAll() {
        return this.imageSet;
    }
}
