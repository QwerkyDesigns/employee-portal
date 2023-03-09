class S3UploadError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default S3UploadError;
