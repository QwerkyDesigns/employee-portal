import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import Divider from '@/components/dividers/Divider';
import CreatorGallery from '@/components/image/gallery/CreatorGallery';
import Select from '@/components/select/Select';
import frontendClient from '@/lib/client/frontendClient';
import { ImageWizardContextType, ImageWizardContext } from '@/lib/contexts/ImageWizardContext';
import { CreateDalleImagesRequest, CreateDalleImagesResponse } from '@/lib/controllers/CreateDalleImagesController';
import { ImageSize } from '@/lib/enums/ImageSizes';
import { ImageLocationDetails } from '@/types/sharedTypes';
import { useContext, useEffect, useState } from 'react';

export const CreateStep = () => {
    const [value, setValue] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [recentlyUploadedImages, setRecentlyUploadedImages] = useState<ImageLocationDetails[]>([]);
    const { textPrompts, artStyles, compilePrompt } = useContext<ImageWizardContextType>(ImageWizardContext);
    const [finalPrompt, setFinalPrompt] = useState<string>('');

    useEffect(() => {
        if (compilePrompt){
            const finalPrompt = compilePrompt();            
            setFinalPrompt(finalPrompt);
        }
    }, []);

    const submitToCreateImages = async () => {
        if (finalPrompt.trim() === '') return;
        setLoading(true);
        const res = await frontendClient.post<CreateDalleImagesRequest, CreateDalleImagesResponse>('create/dalle', {
            n: value,
            size: ImageSize.large,
            prompt: finalPrompt
        });
        console.log("--------------")
        console.log(res)
        console.log("--------------")


        setRecentlyUploadedImages(res.details);
        setLoading(false);
    };

    return (
        <div>
            <div className="mb-2 flex flex-col w-full flex-row items-center justify-between">
                <div className="flex flex-row mb-2">
                    <div className="flex flex-col justify-center">
                        <span className="mb-4 text-center font-extrabold">Your prompt</span>
                        <span className="text-center">{finalPrompt}</span>
                    </div>
                    <div className="w-1/2">
                        <Select
                            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            onChange={(e: any) => setValue(e.target.value)}
                            value={value}
                            label="Create how many?"
                        />
                    </div>
                </div>
                <div className="w-full text-center mt-3">
                    <ButtonWithSpinner loading={loading} onClick={submitToCreateImages}>
                        Submit to create new images (3 credits)
                    </ButtonWithSpinner>
                </div>
            </div>
            {recentlyUploadedImages.length > 0 && (
                <>
                    <Divider text="" />
                    <div aria-label="right side of the screen" className="mt-2 grow bg-blue-300 p-4">
                        <CreatorGallery details={recentlyUploadedImages} />
                    </div>
                </>
            )}
        </div>
    );
};
