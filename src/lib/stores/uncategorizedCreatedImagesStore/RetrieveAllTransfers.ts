import getSignedUrlsForAllImageKeys from '../s3Core/getSignedUrlsForAllFiles';
import { ImageState } from '@/lib/enums/ImageState';
import { GetAllImagesForAccount } from '@/lib/db/GetAllImagesForAccount';
import { ImageOrigin } from '@/lib/enums/ImageOrigin';


export default async function getAllUncategorizedImages(email: string, imageOrigin?: ImageOrigin) {

    const allAccountImages = await GetAllImagesForAccount(email);
    let unCategorized = allAccountImages.filter(x => x.imageState === ImageState.Uncategorized.toString())
    if (imageOrigin) {
        unCategorized = unCategorized.filter(x => x.originId === imageOrigin.toString())
    }
    const imageKeys = unCategorized.map(x => x.storageKey);

    const signedUrls = await getSignedUrlsForAllImageKeys(imageKeys);
    return signedUrls;
}
