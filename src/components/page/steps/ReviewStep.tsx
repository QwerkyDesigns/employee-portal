import { NumberSelector } from '@/components/sliders/NumberSelector';
import { useState } from 'react';

export const ReviewStep = () => {
    const [value, setValue] = useState<number>(1);

    return (
        <>
            <NumberSelector value={value} setValue={setValue} />;
        </>
    );
};
