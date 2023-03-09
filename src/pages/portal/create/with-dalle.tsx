import { SliderInput } from '@/components/sliders/slider';
import frontendClient from '@/lib/client/frontendClient';
import { ImageSize } from '@/lib/enums/ImageSizes';
import { ChangeEvent, useState } from 'react';
import { CreateDalleImagesResponse, CreateDalleImagesRequest } from '@/lib/controllers/CreateDalleImagesController';
import { ImageLocationDetails } from '@/lib/stores/s3Core/S3Core';
import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import { PaddedImage } from '@/components/images/PaddedImage';
import { DashboardLayout } from '../../../components/layouts/DashboardLayout';
import Select from '@/components/select/Select';
import TextArea, { TextAreaChangeEvent } from '@/components/text/TextArea';

export const ArtStyles = [
    'hyperrealism',
    'photorealism',
    'Minimalism',
    'line art',
    'retro art',
    'vintage art',
    'intricate lettering art',
    'illuminated letters',
    'Geometric drawing',
    'geometric abstract',
    'Vector artwork',
    '3D illustration',
    'surrealist art',
    'psychedelic art',
    'flat art',
    'fractal art',
    'digital art',
    'digital neon art',
    'digital pastel art',
    ''
];

export default function CreateWithDallePage() {
    const [whatDoYouWantToBuild, setWhatDoYouWantToBuild] = useState<string>('');
    const [whatTypeOfProduct, setWhatTypeOfProduct] = useState<string>('');

    const [value, setValue] = useState<number>(1);
    const [recentlyUploadedImages, setRecentlyUploadedImages] = useState<ImageLocationDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [artStyle, setArtStyle] = useState<string>('');

    const WhatDoYouWantToBuild = (event: TextAreaChangeEvent) => {
        event.preventDefault();
        setWhatDoYouWantToBuild(event.target.value);
    };

    const WhatTypeOfProduct = (event: TextAreaChangeEvent) => {
        event.preventDefault();
        setWhatTypeOfProduct(event.target.value);
    };

    return (
        <DashboardLayout pageName="Create with Dall-E">
            <div style={{ height: '3rem' }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <SliderInput value={value} setValue={setValue} />
                <Select
                    options={ArtStyles.sort()}
                    onChange={(val) => {
                        if (val) {
                            setArtStyle(val.target.value);
                        }
                    }}
                />
            </div>

            <div className="mt-12 mb-12 flex w-full justify-center">
                <TextArea label="What would you like to create today?" onChange={WhatDoYouWantToBuild} />
            </div>
            <div className="mt-12 mb-12 flex w-full justify-center">
                <TextArea label="What type of product are you creating?" onChange={WhatTypeOfProduct} />
            </div>
            <div className="mt-12 mb-12 flex w-full justify-center">
                <TextArea label="What type of product are you creating?" onChange={WhatTypeOfProduct} />
            </div>

            {/* <Textarea
        style={{ marginTop: '4rem' }}
        placeholder="A manatee sitting on the beach with a cocktail"
        label="Provide a moderately specific description of an image you would like to create"
        withAsterisk
        value={text}
        minRows={5}
        onChange={(event) => {
          event.preventDefault()
          setText(event.target.value)
        }}
      /> */}
            <div style={{ height: '3rem' }} />
            <ButtonWithSpinner
                loading={loading}
                onClick={async () => {
                    setLoading(true);
                    const res = await frontendClient.post<CreateDalleImagesRequest, CreateDalleImagesResponse>('create/dalle', {
                        n: value,
                        size: ImageSize.large,
                        prompt: (whatDoYouWantToBuild.trim() + ' ' + artStyle).trim()
                    });
                    setRecentlyUploadedImages(res.details);
                    setLoading(false);
                }}
            >
                Submit to create new images
            </ButtonWithSpinner>
            <div style={{ height: '3rem' }} />
            {recentlyUploadedImages && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {recentlyUploadedImages.map((details, i) => (
                        <PaddedImage key={details.presignedUrl} url={details.presignedUrl} />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
