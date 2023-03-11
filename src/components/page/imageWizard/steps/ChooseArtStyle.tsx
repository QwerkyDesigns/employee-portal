import Select from '@/components/select/Select';
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

export const ChooseArtStyle = () => {
    const [artStyle, setArtStyle] = useState<string>('');

    return (
        <div className="flex flex-row justify-center">
            <Select
                label="What kind of art style are you interested to use?"
                options={ArtStyles.sort()}
                onChange={(val) => {
                    if (val) {
                        setArtStyle(val.target.value);
                    }
                }}
            />
        </div>
    );
};
