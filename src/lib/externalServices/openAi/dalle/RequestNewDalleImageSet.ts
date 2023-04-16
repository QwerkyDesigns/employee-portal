import openApiClient from '@/lib/client/openApiClient';
import { ImageBatchMetaData } from '@/types/ImageBatchmetaData';
import { ImageSize } from '../../../enums/ImageSizes';
import { CreateImageRequest } from 'openai';

export type DalleResponse = {
    urls: string[];
    metaData: ImageBatchMetaData;
};

export async function requestNewDalleImageSet(prompt: string, n: number, size: ImageSize): Promise<DalleResponse> {

    if (typeof n !== 'number') {
        n = parseInt(n);
    }
    const imgReq: CreateImageRequest = { prompt, n, size }
    try {

        const response = await openApiClient.createImage(imgReq);
        console.log(response)

        const imageUrls: string[] = [];
        response.data.data.forEach((val) => {
            if (val.url) {
                imageUrls.push(val.url);
            }
        });
        console.log(imageUrls)
        const batchMeta: ImageBatchMetaData = {
            prompt: prompt,
            imageSize: size,
            numImages: n
        };
        return { urls: imageUrls, metaData: batchMeta };
    } catch (err: any) {
        console.log(err)
        throw new Error(err)
    }
}
