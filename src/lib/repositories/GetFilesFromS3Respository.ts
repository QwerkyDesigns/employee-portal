import S3CoreRepository from "./S3CoreRepository";

class GetFilesFromS3Repository extends S3CoreRepository {
    
    
    constructor() {
        super();
    }

    // This grabs all files for a given origin
    public GetAllUnTransferedFilesFromOrigin(ImageOrigin origin){
        this.getAllFiles()
    }


}
