import { useState } from 'react';
import { Image, Loader } from '@mantine/core';
import Zoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';
import { BasicSpinnner } from '../spinners/BasicSpinner';

export const PaddedImage = ({ url, s3Key, alt }: { url: string; s3Key?: string; alt?: string }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const frame: { height: string; width: string; edge: string } = {
        height: '200px',
        width: '200px',
        edge: '0.75rem'
    };

    return (
        <>
            <Zoom>
                <Image
                    style={{
                        animation: 'fadeIn 0.5s',
                        display: loading ? 'none' : 'block',
                        margin: frame.edge,
                        padding: frame.edge,
                        height: frame.height,
                        width: frame.width
                    }}
                    key={url}
                    src={url}
                    alt={alt ?? 'alternate'}
                    onLoad={() => {
                        setLoading(false);
                    }}
                />
            </Zoom>
            {s3Key && <span>{s3Key}</span>}
            {loading && (
                <BasicSpinnner
                    style={{
                        margin: frame.edge,
                        padding: frame.edge,
                        height: frame.height,
                        width: frame.width,
                        display: loading ? 'block' : 'none'
                    }}
                />
            )}
        </>
    );
};
