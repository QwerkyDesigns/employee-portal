import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { PaginatedReviewBase } from '../../../components/layouts/PaginatedReviewBase';

export default function ReviewDalleTransfers() {
    return <PaginatedReviewBase origin={ImageOrigin.Dalle} />;
}
