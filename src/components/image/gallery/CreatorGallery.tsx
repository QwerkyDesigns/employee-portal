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
            <div className="h-2/3">{largePreview && <PaddedImage url={largePreview} />}</div>
            <div className="h-1/3">
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {details.map((detail, i) => (
                        <li key={detail.presignedUrl} className="relative">
                            <div className="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                <PaddedImage url={detail.presignedUrl} alt={detail.name} />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                    <span className="sr-only">View details for {detail.name}</span>
                                </button>
                            </div>
                            {showTitle && <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{detail.name}</p>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
