import { StatusCodes } from '@/lib/enums/StatusCodes';
import { IError } from './IError';

class S3DownloadError extends Error implements IError {
    constructor(message: string, errorCode?: StatusCodes) {
        super(message);
        this.errorCode = errorCode;
    }
    errorCode?: StatusCodes;
}

export default S3DownloadError;
