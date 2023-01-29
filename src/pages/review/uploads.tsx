import Layout from "@/components/Layout";
import client from "@/lib/client/frontendAxiosClient";
import { GetAllUntransferredResponse } from "@/lib/controllers/GetAllUntransferredController";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Uploads() {
    const [imageUrls, setImageurls] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const res = await client.get<GetAllUntransferredResponse>(
                "/api/review/get-all-untransferred?origin=upload"
            );
            console.log(res);
            setImageurls(res.allViewingUrls);
        })();
    }, []);

    return (
        <Layout pageName="Check your uploaded images">
            <>
                {imageUrls &&
                    imageUrls.map((url) => <Image key={url} height={300} width={300} src={url} alt="alter" />)}
            </>
        </Layout>
    );
}
