import { useState } from "react";
import { Image, Loader } from "@mantine/core";

export const PaddedImage = ({ url }: { url: string }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const frame: { height: string; width: string; edge: string } = {
    height: "100px",
    width: "100px",
    edge: "0.75rem",
  };

  return (
    <>
      <Image
        style={{
          animation: "fadeIn 0.5s",
          display: loading ? "none" : "block",
          border: "1px solid black",
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
      <Loader
        style={{
          border: "1px solid black",
          margin: frame.edge,
          padding: frame.edge,
          height: frame.height,
          width: frame.width,
          display: loading ? "block" : "none",
        }}
      />
    </>
  );
};
