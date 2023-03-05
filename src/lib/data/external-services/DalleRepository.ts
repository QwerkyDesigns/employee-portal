import { ImageSize } from "@/lib/enums/ImageSizes";
import env from "@/lib/environment/Environment";
import { EnvironmentVariable } from "@/lib/environment/EnvironmentVariable";
import { ImageBatchMetaData } from "@/types/ImageBatchmetaData";
import { Configuration, OpenAIApi } from "openai";
import UnCategorizedImagesStore from "../stores/UncategorizedImagesStore";

const openApiKey = env.GetStringEnvironmentVarialble(EnvironmentVariable.OpenAiApiKey);

const configuration = new Configuration({
    apiKey: openApiKey,
});

export type DalleResponse = {
    urls: string[];
    metaData: ImageBatchMetaData;
};

class DalleRepository {
    private openAIApi: OpenAIApi;
    s3Repository: UnCategorizedImagesStore;

    constructor() {
        this.openAIApi = new OpenAIApi(configuration);
        this.s3Repository = new UnCategorizedImagesStore();
    }

    public async RequestNewImageSet(prompt: string, n: number, size: ImageSize): Promise<DalleResponse> {
        const response = await this.openAIApi.createImage({
            prompt: prompt,
            n: n,
            size: size,
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
            numImages: n,
        };
        return { urls: imageUrls, metaData: batchMeta };
    }
}

export default DalleRepository;
