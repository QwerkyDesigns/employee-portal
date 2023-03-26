import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import getSignedUrlsForAllFiles from '../s3Core/getSignedUrlsForAllFiles';

export default async function retrieveAllTransfers(bucket: string, imageOrigin?: ImageOrigin) {
    const viewingUrls = await getSignedUrlsForAllFiles(bucket, imageOrigin ?? '');
    return viewingUrls;
}
