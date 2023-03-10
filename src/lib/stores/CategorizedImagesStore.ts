import DataContainers from '@/lib/models/data-containers/S3DataContainers';
import S3Core from './s3Core/S3Core';

export class CategorizedImagesStore extends S3Core {
    constructor() {
        super(DataContainers.CurrentDataContainer().BusinessStore);
    }
}
