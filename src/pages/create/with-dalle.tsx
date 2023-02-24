import Layout from "@/components/Layout";
import { SliderInput } from "@/components/sliders/slider";
import frontendClient from "@/lib/client/frontendClient";
import { ImageSize } from "@/lib/enums/ImageSizes";
import { Container, Select, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import {
    CreateDalleImagesResponse,
    CreateDalleImagesRequest,
} from "@/lib/controllers/CreateDalleImagesController";
import { ImageLocationDetails } from "@/lib/stores/s3Core/S3Core";
import { ButtonWithSpinner } from "@/components/buttons/ButtonWithSpinner";
import { PaddedImage } from "@/components/images/PaddedImage";

export const ArtStyles = [
    "hyperrealism",
    "photorealism",
    "Minimalism",
    "line art",
    "retro art",
    "vintage art",
    "intricate lettering art",
    "illuminated letters",
    "Geometric drawing",
    "geometric abstract",
    "Vector artwork",
    "flat art",
    "3D illustration",
    "surrealist art",
    "psychedelic art",
    "fractal art",
    "digital art",
    "digital neon art",
];

export default function CreateWithDallePage() {
    const [text, setText] = useState<string>("");
    const [value, setValue] = useState<number>(1);
    const [recentlyUploadedImages, setRecentlyUploadedImages] = useState<
        ImageLocationDetails[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [artStyle, setArtStyle] = useState<string>("");
    return (
        <Layout pageName="Create dall-e images">
            <Container>
                <div style={{ height: "3rem" }} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <SliderInput value={value} setValue={setValue} />
                    <Select
                        data={ArtStyles.sort()}
                        onChange={(value) => {
                            if (value) {
                                setArtStyle(value);
                            }
                        }}
                    />
                </div>
                <Textarea
                    style={{ marginTop: "4rem" }}
                    placeholder="A manatee sitting on the beach with a cocktail"
                    label="Provide a moderately specific description of an image you would like to create"
                    withAsterisk
                    value={text}
                    minRows={5}
                    onChange={(event) => {
                        event.preventDefault();
                        setText(event.target.value);
                    }}
                />
                <div style={{ height: "3rem" }} />
                <ButtonWithSpinner
                    loading={loading}
                    onClick={async () => {
                        setLoading(true);
                        const res = await frontendClient.post<
                            CreateDalleImagesRequest,
                            CreateDalleImagesResponse
                        >("create/dalle", {
                            n: value,
                            size: ImageSize.large,
                            prompt: (text.trim() + " " + artStyle).trim(),
                        });
                        setRecentlyUploadedImages(res.details);
                        setLoading(false);
                    }}
                >
                    Submit to create new images
                </ButtonWithSpinner>
                <div style={{ height: "3rem" }} />
                {recentlyUploadedImages && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        {recentlyUploadedImages.map((details, i) => (
                            <PaddedImage
                                key={details.presignedUrl}
                                url={details.presignedUrl}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </Layout>
    );
}
