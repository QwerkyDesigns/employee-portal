import { useState } from "react";
import { Image, Loader } from "@mantine/core";

export const PaddedImage = ({ url }: { url: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <>
            <Image
                style={{
                    animation: "fadeIn 0.5s",
                    display: loading ? "none" : "block",
                    border: "1px solid black",
                    margin: "0.25rem",
                    padding: "0.25rem",
                    height: "400px",
                    width: "400px",
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
                    margin: "0.25rem",
                    padding: "0.25rem",
                    display: loading ? "block" : "none",
                    height: "400px",
                    width: "400px",
                }}
            />
        </>
    );
};
