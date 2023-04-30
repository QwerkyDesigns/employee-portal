import { PaddedImage } from '@/components/images/PaddedImage';
import { ImageLocationDetails } from '@/types/sharedTypes';
import { useState } from 'react';

export type BasicGalleryProps = {
    details: ImageLocationDetails[];
    showTitle?: boolean;
};

export default function CreatorGallery({ details, showTitle = false }: BasicGalleryProps) {
    const [largePreview, setLargePreview] = useState('');

    return (
        <div className="flex flex-col">
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {details.map((detail, i) => (
                    <li key={detail.presignedUrl} className="relative">
                        <PaddedImage url={detail.presignedUrl} alt={detail.key} />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {detail.key}</span>
                        </button>
                        {showTitle && <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{detail.key}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
