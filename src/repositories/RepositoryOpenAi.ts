import { RepositoryS3Images } from "@/repositories/RepositoryS3Images";
import { ImageBatchMetaData } from "@/types/ImageBatchmetaData";
import { Configuration, OpenAIApi } from "openai";
import { ImageSize } from "../lib/enums/ImageSizes";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenApiRepository {
  private openAIApi: OpenAIApi;
  private s3Repository: RepositoryS3Images;

  constructor() {
    this.openAIApi = new OpenAIApi(configuration);
    this.s3Repository = new RepositoryS3Images();
  }

  public async CreateImage(prompt: string, n: number, size: ImageSize) {
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
      numImages: n,
      imageSize: size,
    };

    await this.s3Repository.SaveImageSetToS3(imageUrls, batchMeta);
  }
}

export default OpenApiRepository;
