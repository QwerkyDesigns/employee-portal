import Layout from "@/components/Layout";
import client from "@/lib/client/frontendAxiosClient";
import { GetAllUntransferredResponse, UnTransferredImageMeta } from "@/lib/controllers/GetAllUntransferredController";
import { useEffect, useState } from "react";
import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { PaddedImage } from "@/components/images/PaddedImage";
import { ImageOptionButtons } from "@/components/buttons/ImageOptionsButtons";

export default function ReviewUploads() {
    const [imageMetas, setImageMetas] = useState<UnTransferredImageMeta[]>([]);

    useEffect(() => {
        (async () => {
            const res = await client.get<GetAllUntransferredResponse>(
                `/api/review/get-all-untransferred?origin=${ImageOrigin.Upload}`
            );
            console.log(res)
            setImageMetas(res.imageMetas);
            console.log(res.imageMetas);
        })();
    }, []);

    return (
        <Layout pageName="Check your uploaded images">
            <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "space-evenly" }}>
                {imageMetas &&
                    imageMetas.map((meta: UnTransferredImageMeta) => {
                        return (
                            <div
                                key={meta.url}
                                style={{ marginBottom: "2rem", display: "flex", flexDirection: "column" }}
                            >
                                <PaddedImage url={meta.url} />
                                <ImageOptionButtons meta={meta} />
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
}
