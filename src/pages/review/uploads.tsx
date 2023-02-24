import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { PaginatedReviewBase } from "./PaginatedReviewBase";

export default function ReviewUploads() {
    return <PaginatedReviewBase origin={ImageOrigin.Upload} />;
}
