import openApiClient from '@/lib/client/openApiClient';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import { ImageSize } from '../../../enums/ImageSizes';

export type DalleResponse = {
    urls: string[];
    metaData: ImageBatchMetaData;
};

export async function requestNewDalleImageSet(prompt: string, n: number, size: ImageSize): Promise<DalleResponse> {
    const response = await openApiClient.createImage({
        prompt: prompt,
        n: n,
        size: size
    });

    const imageUrls: string[] = [];
    response.data.data.forEach((val) => {
        if (val.url) {
            imageUrls.push(val.url);
        }
    });

    const batchMeta: ImageBatchMetaData = {
        prompt: prompt,
        imageSize: size,
        numImages: n
    };
    return { urls: imageUrls, metaData: batchMeta };
}
