import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import { NumberSelector } from '@/components/sliders/NumberSelector';
import frontendClient from '@/lib/client/frontendClient';
import { CreateDalleImagesRequest, CreateDalleImagesResponse } from '@/lib/controllers/CreateDalleImagesController';
import { ImageSize } from '@/lib/enums/ImageSizes';
import { ImageLocationDetails } from '@/lib/stores/s3Core/S3Core';
import { useState } from 'react';

export const ReviewStep = () => {
    const [value, setValue] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentFinalSubmission, setCurrentFinalSubmission] = useState<string>('');
    const [recentlyUploadedImages, setRecentlyUploadedImages] = useState<ImageLocationDetails[]>([]);
    const [artStyle, setArtStyle] = useState<string>('');

    return (
        <>
            <NumberSelector value={value} setValue={setValue} label="Choose how many images you would like to create" />
            <div style={{ height: '3rem' }} />
            <ButtonWithSpinner
                loading={loading}
                onClick={async () => {
                    if (currentFinalSubmission.trim() === '') return;
                    setLoading(true);
                    const res = await frontendClient.post<CreateDalleImagesRequest, CreateDalleImagesResponse>('create/dalle', {
                        n: value,
                        size: ImageSize.large,
                        prompt: (currentFinalSubmission.trim() + ' ' + artStyle).trim()
                    });
                    setRecentlyUploadedImages(res.details);
                    setLoading(false);
                }}
            >
                Submit to create new images
            </ButtonWithSpinner>
        </>
    );
};
