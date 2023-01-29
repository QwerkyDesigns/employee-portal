import { ImageSize } from "@/lib/enums/ImageSizes";
import { Dispatch, SetStateAction } from "react";

export type ImageRequest = {
    n: number;
    size: ImageSize;
    prompt: string;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;
