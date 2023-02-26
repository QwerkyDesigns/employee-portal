import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { PaginatedReviewBase } from "../../components/PaginatedReviewBase";

export default function ReviewDalleTransfers() {
    return <PaginatedReviewBase origin={ImageOrigin.Dalle} />;
}
