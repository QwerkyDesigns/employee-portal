import { PaddedImage } from "@/components/images/PaddedImage";
import Layout from "@/components/Layout";
import client from "@/lib/client/frontendAxiosClient";
import { GetSingleImageUrlResponse } from "@/lib/controllers/GetImageByKeyController";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { Button, TextInput } from "@mantine/core";

export default function CategorizePage() {
    const router = useRouter();
    const { key } = router.query;

    const [image, setImage] = useState<string>();
    const [text, setText] = useState<string>("");

    useEffect(() => {
        (async () => {
            const url = queryString.stringifyUrl({ url: "/api/review/get-by-image-key", query: { key: key } });
            console.log("URL: " + url);
            const res = await client.get<GetSingleImageUrlResponse>(url);
            const { url: decodedUrl } = queryString.parse(res.url);
            if (decodedUrl && typeof decodedUrl === "string") {
                setImage(decodedUrl);
            }
        })();
    }, [key]);

    return (
        <Layout pageName="Categorize and sell">
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
                        const res = await client.post<
                            CreateImageCategorizationRequest,
                            CreateImageCategorizationResponse
                        >("/api/create/dalle", {
                            productImageName: text,
                            category: "",
                        });
                    }}
                >
                    Submit to create new images
                </Button>
            </>
        </Layout>
    );
}
