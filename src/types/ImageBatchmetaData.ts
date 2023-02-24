import { ImageSize } from "../lib/enums/ImageSizes";

export type ImageBatchMetaData = {
  prompt: string;
  imageSize: ImageSize;
  numImages: number;
};
