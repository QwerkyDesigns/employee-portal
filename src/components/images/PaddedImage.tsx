import { useState } from 'react';
import { Image, Loader } from '@mantine/core';
import Zoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';

export const PaddedImage = ({
  url,
  s3Key,
}: {
  url: string;
  s3Key?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const frame: { height: string; width: string; edge: string } = {
    height: '200px',
    width: '200px',
    edge: '0.75rem',
  };

  return (
    <>
      <Zoom>
        <Image
          style={{
            animation: 'fadeIn 0.5s',
            display: loading ? 'none' : 'block',
            border: '1px solid black',
            margin: frame.edge,
            padding: frame.edge,
            height: frame.height,
            width: frame.width,
          }}
          key={url}
          src={url}
          alt="alter"
          onLoad={() => {
            setLoading(false);
          }}
        />
      </Zoom>
      {s3Key && <span>{s3Key}</span>}
      <Loader
        style={{
          border: '1px solid black',
          margin: frame.edge,
          padding: frame.edge,
          height: frame.height,
          width: frame.width,
          display: loading ? 'block' : 'none',
        }}
      />
    </>
  );
};
