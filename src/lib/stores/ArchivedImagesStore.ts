import DataContainers from "../models/data-containers/S3DataContainers";
import S3Core from "./s3Core/S3Core";

class ArchivedImagesStore extends S3Core {
    constructor() {
        super(DataContainers.CurrentDataContainer().ArchivedImagesStore);
    }

    public async GetAllArchivedImages() {
        const signedUrls = this.getSignedUrlsForAllFiles();
        return signedUrls;
    }
}

export default ArchivedImagesStore;
