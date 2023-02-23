import { PaddedImage } from "@/components/images/PaddedImage";
import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import { GetSingleImageUrlResponse } from "@/lib/controllers/GetImageByKeyController";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { Button, TextInput } from "@mantine/core";
import {
    CreateImageCategorizationRequest,
    CreateImageCategorizationResponse,
} from "@/lib/controllers/CategorizeAndUploadController";

export default function CategorizePage() {
    const router = useRouter();
    const { key } = router.query;

    const [image, setImage] = useState<string>();
    const [text, setText] = useState<string>("");

    useEffect(() => {
        (async () => {
            const url = queryString.stringifyUrl({
                url: "review/get-by-image-key",
                query: { key: key },
            });
            console.log("URL: " + url);
            const res = await frontendClient.get<GetSingleImageUrlResponse>(
                url
            );
            const { url: decodedUrl } = queryString.parse(res.url);
            if (decodedUrl && typeof decodedUrl === "string") {
                setImage(decodedUrl);
            }
        })();
    }, [key]);

    return (
        <Layout pageName="Categorize: Printify">
            <>
                {image && (
                    <>
                        <PaddedImage url={image} />
                    </>
                )}
                <TextInput
                    style={{ marginTop: "4rem" }}
                    placeholder="Delectible Soup"
                    label="Give your new printable product image a name (this will be the item name in the store)"
                    withAsterisk
                    multiple
                    value={text}
                    onChange={(event) => {
                        event.preventDefault();
                        setText(event.target.value);
                    }}
                />
                <Button
                    onClick={async () => {
                        if (key && typeof key === "string") {
                            const res = await frontendClient.post<
                                CreateImageCategorizationRequest,
                                CreateImageCategorizationResponse
                            >("categorize/categorize-and-upload", {
                                imageKey: key,
                                productName: text,
                            });
                        }
                    }}
                >
                    Submit to create new images
                </Button>
            </>
        </Layout>
    );
}
