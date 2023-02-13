import Layout from "@/components/Layout";
import { SliderInput } from "@/components/sliders/slider";
import client from "@/lib/client/frontendAxiosClient";
import { ImageSize } from "@/lib/enums/ImageSizes";
import { Button, Container, TextInput } from "@mantine/core";
import { useState } from "react";
import { Image, Loader } from "@mantine/core";
import { ImageLocationDetails } from "@/lib/repositories/storageRepositories/s3Core/S3CoreRepository";
import { CreateDalleImagesResponse, CreateDalleImagesRequest } from "@/lib/controllers/CreateDalleImagesController";

export default function CreateWithDallePage() {
    const [text, setText] = useState<string>("");
    const [value, setValue] = useState<number>(1);
    const [recentlyUploadedImages, setRecentlyUploadedImages] = useState<ImageLocationDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Layout pageName="Create dall-e images">
            <Container>
                <div style={{ height: "3rem" }} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <SliderInput value={value} setValue={setValue} />
                </div>
                <TextInput
                    style={{ marginTop: "4rem" }}
                    placeholder="A manatee sitting on the beach with a cocktail"
                    label="Provide a moderately specific description of an image you would like to create"
                    withAsterisk
                    multiple
                    value={text}
                    onChange={(event) => {
                        event.preventDefault();
                        setText(event.target.value);
                    }}
                />
                <div style={{ height: "3rem" }} />
                <Button
                    onClick={async () => {
                        setLoading(true);
                        const res = await client.post<CreateDalleImagesRequest, CreateDalleImagesResponse>(
                            "/api/create/dalle",
                            {
                                n: value,
                                size: ImageSize.large,
                                prompt: text,
                            }
                        );
                        setRecentlyUploadedImages(res.details);
                        setLoading(false);
                    }}
                >
                    Submit to create new images
                </Button>
                <div style={{ height: "3rem" }} />
                {recentlyUploadedImages && (
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {recentlyUploadedImages.map((details, i) => (
                            <div
                                key={details.presignedUrl}
                                style={{ margin: "1rem", border: "1px solid black", padding: "0.25rem" }}
                            >
                                <Image
                                    height={250}
                                    width={250}
                                    src={details.presignedUrl}
                                    alt="wow"
                                    caption={details.name}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {loading && <Loader />}
            </Container>
        </Layout>
    );
}
