import getSignedUrlsForAllFiles from '../s3Core/getSignedUrlsForAllFiles';
import { archiveStoreBucket } from './archivedImageStoreConstants';

export async function getAllArchivedImages() {
    const signedUrls = await getSignedUrlsForAllFiles(archiveStoreBucket);
    return signedUrls;
}
