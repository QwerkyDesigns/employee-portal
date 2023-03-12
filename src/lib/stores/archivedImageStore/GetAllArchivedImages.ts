import getSignedUrlsForAllFiles from '../s3Core/getSignedUrlsForAllFiles';
import { archiveStoreBucket } from './archivedImageStoreConstants';

export async function GetAllArchivedImages() {
    const signedUrls = await getSignedUrlsForAllFiles(archiveStoreBucket);
    return signedUrls;
}
