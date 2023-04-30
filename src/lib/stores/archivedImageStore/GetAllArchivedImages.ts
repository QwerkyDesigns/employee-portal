import { ImageState } from '@/lib/enums/ImageState';
import getSignedUrlsForAllImageKeys from '../s3Core/getSignedUrlsForAllFiles';
import { GetAllImagesForAccount } from '@/lib/db/GetAllImagesForAccount';

export async function getAllArchivedImages(email: string) {
    
    const allAccountImages = await GetAllImagesForAccount(email);
    const archivedImageKeys = allAccountImages.filter(x => x.imageState === ImageState.Archived.toString()).map(x => x.storageKey);
    const signedUrls = await getSignedUrlsForAllImageKeys(archivedImageKeys);

    return signedUrls;
}
