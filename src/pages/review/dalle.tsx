import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import {
    GetAllUntransferredResponse,
    UnTransferredImageMeta,
} from "@/lib/controllers/GetAllUntransferredController";
import { useEffect, useState } from "react";
import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { PaddedImage } from "@/components/images/PaddedImage";
import { ImageOptionButtons } from "@/components/buttons/ImageOptionsButtons";
import { Button, Pagination } from "@mantine/core";

export default function ReviewDalleTransfers() {
    const [imageUrls, setImageurls] = useState<UnTransferredImageMeta[][]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const res = await frontendClient.get<GetAllUntransferredResponse>(
                `review/get-all-untransferred?origin=${ImageOrigin.Dalle}`
            );
            console.log(res);

            const batches = batchMetas(
                res.imageMetas.filter((x) => !x.key.endsWith("meta.txt")),
                5
            );
            setImageurls(batches);
            setTotalPages(batches.length);
        })();
    }, []);

    const batchMetas = (
        imageMetas: UnTransferredImageMeta[],
        batchSize: number
    ): UnTransferredImageMeta[][] => {
        const batches: UnTransferredImageMeta[][] = [];
        let currentBatch: UnTransferredImageMeta[] = [];

        for (let i = 0; i < imageMetas.length; i++) {
            currentBatch.push(imageMetas[i]);
            if (
                currentBatch.length === batchSize ||
                i === imageMetas.length - 1
            ) {
                batches.push(currentBatch);
                currentBatch = [];
            }
        }

        return batches;
    };

    // const onPrev = () => {
    //     setPage((prev) => {
    //         if (prev > 0) {
    //             return prev - 1;
    //         }
    //         return prev;
    //     });
    // };

    // const onNext = () => {
    //     setPage((prev) => {
    //         if (prev < totalPages - 1) {
    //             return prev + 1;
    //         }
    //         return prev;
    //     });
    // };

    return (
        <Layout pageName="Check your uploaded images">
            <div className="h-full flex justify-center mt-4 mb-4">
                <Pagination
                    page={page}
                    onChange={(p) => {
                        setPage(p);
                    }}
                    total={totalPages}
                />
            </div>
            <div className="w-full text-center flex flex-row justify-around"></div>
            <div
                style={{
                    display: "flex",
                    flexFlow: "wrap",
                    justifyContent: "space-evenly",
                }}
            >
                {imageUrls &&
                    imageUrls.length > 0 &&
                    imageUrls[page - 1].map((meta) => {
                        return (
                            <div
                                key={meta.url}
                                className="flex flex-col justify-center"
                            >
                                <PaddedImage
                                    key={meta.url}
                                    s3Key={meta.key}
                                    url={meta.url}
                                />
                                <ImageOptionButtons meta={meta} />
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
}
