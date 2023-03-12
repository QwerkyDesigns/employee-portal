import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import getSignedUrlsForAllFiles from '../s3Core/getSignedUrlsForAllFiles';

export default async function RetrieveAllTransfers(imageOrigin?: ImageOrigin) {
    const viewingUrls = await getSignedUrlsForAllFiles(imageOrigin ?? '');
    return viewingUrls;
}
