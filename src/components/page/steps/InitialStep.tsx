import Select from '@/components/select/Select';
import { NumberSelector } from '@/components/sliders/NumberSelector';
import TextArea from '@/components/text/TextArea';
import { unpackChangeEvent } from '@/lib/decorators/EventChangeDecorator';
import { useState } from 'react';

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

{
    /* <div style={{ height: '3rem' }} />
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
</ButtonWithSpinner> */
}

export const InitialStep = () => {
    const [whatDoYouWantToBuild, setWhatDoYouWantToBuild] = useState<string>('');
    const WhatDoYouWantToBuild = unpackChangeEvent((value: string) => setWhatDoYouWantToBuild(value));

    const [whatTypeOfProduct, setWhatTypeOfProduct] = useState<string>('');
    const WhatTypeOfProduct = unpackChangeEvent((value: string) => setWhatTypeOfProduct(value));

    const [whoIsTheProductTargetedAt, setWhoIsTheProductTargetedAt] = useState<string>('');
    const WhoIsTheProductTargetedAt = unpackChangeEvent((value: string) => setWhoIsTheProductTargetedAt(value));

    const [howDoesThisProductStandOut, sethowDoesThisProductStandOut] = useState<string>('');
    const HowDoesThisProductStandOut = unpackChangeEvent((value: string) => sethowDoesThisProductStandOut(value));

    const [artStyle, setArtStyle] = useState<string>('');


    return (
        <div aria-label="left side of the screen" className="flex w-1/3 flex-col border-r-indigo-400">
            <div style={{ height: '3rem' }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Select
                    label='What kind of art style are you interested to use?'
                    options={ArtStyles.sort()}
                    onChange={(val) => {
                        if (val) {
                            setArtStyle(val.target.value);
                        }
                    }}
                />
            </div>

            <div className="w-full">
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea value={whatDoYouWantToBuild} label="What would you like to create today?" onChange={WhatDoYouWantToBuild} />
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea value={whatTypeOfProduct} label="What type of product are you creating?" onChange={WhatTypeOfProduct} />
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea value={whoIsTheProductTargetedAt} label="Who is this product targeted at?" onChange={WhoIsTheProductTargetedAt} />
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea value={howDoesThisProductStandOut} label="How does this product stand out?" onChange={HowDoesThisProductStandOut} />
                </div>
            </div>
        </div>
    );
};
