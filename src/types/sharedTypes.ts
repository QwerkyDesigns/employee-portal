import { ImageSize } from "@/lib/enums/ImageSizes";

export type ImageRequest = {
  n: number;
  size: ImageSize;
  prompt: string;
};
