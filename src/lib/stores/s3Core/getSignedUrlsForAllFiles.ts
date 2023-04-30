import createPresignedUrlForViewing from './createPresignedUrlForViewing';
import { imageStoreBucket } from '../uncategorizedCreatedImagesStore/imageStoreConstants';

export default async function getSignedUrlsForAllImageKeys(imageKeys: string[]) {

    const data = imageKeys.map((k) => {
        const url = createPresignedUrlForViewing(imageStoreBucket, k);
        return { key: k, url };
    });
    const presignedUrlWithMeta = await Promise.all(
        data.map(async ({ key, url }) => {
            const resolvedUrl = await url;
            return { key, url: resolvedUrl };
        })
    );
    return presignedUrlWithMeta;
}