import Layout from "@/components/Layout";
import client from "@/lib/client/frontendAxiosClient";
import { GetAllUntransferredResponse, UnTransferredImageMeta } from "@/lib/controllers/GetAllUntransferredController";
import { useEffect, useState } from "react";
import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { PaddedImage } from "@/components/images/PaddedImage";
import { ImageOptionButtons } from "@/components/buttons/ImageOptionsButtons";

export default function ReviewDalleTransfers() {
    const [imageUrls, setImageurls] = useState<UnTransferredImageMeta[]>([]);

    useEffect(() => {
        (async () => {
            const res = await client.get<GetAllUntransferredResponse>(
                `/api/review/get-all-untransferred?origin=${ImageOrigin.Dalle}`
            );
            setImageurls(res.imageMetas);
        })();
    }, []);

    return (
        <Layout pageName="Check your uploaded images">
            <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "space-evenly" }}>
                {imageUrls &&
                    imageUrls.map((meta) => {
                        return (
                            <div className="flex flex-col justify-center">
                                <PaddedImage key={meta.url} url={meta.url} />
                                <ImageOptionButtons meta={meta} />
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
}
