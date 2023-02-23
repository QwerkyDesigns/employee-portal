import { ImageOptionButtons } from "@/components/buttons/ImageOptionsButtons";
import { PaddedImage } from "@/components/images/PaddedImage";
import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import {
    UnCategorizedImageMeta,
    GetAllUntransferredResponse,
} from "@/lib/controllers/GetAllUntransferredController";
import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { batch } from "@/lib/utils/batch";
import { Pagination, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export const PaginatedReviewBase = ({ origin }: { origin: ImageOrigin }) => {
    const [imageMetaPages, setImageMetaPages] = useState<
        UnCategorizedImageMeta[][]
    >([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const res = await frontendClient.get<GetAllUntransferredResponse>(
                `review/get-all-untransferred?origin=${ImageOrigin.Upload}`
            );

            const batches = batch(
                res.imageMetas.filter((x) => !x.key.endsWith("meta.txt")),
                5
            );

            setImageMetaPages(batches);
            setTotalPages(batches.length);
        })();
    }, []);

    return (
        <Layout pageName="Review: Uploads">
            {totalPages === 0 ? (
                <Text align="center">No uploaded images to review</Text>
            ) : (
                <>
                    <div className="h-full flex justify-center mt-4 mb-4">
                        <Pagination
                            page={page}
                            onChange={(p) => {
                                setPage(p);
                            }}
                            total={totalPages}
                        />
                    </div>
                    <div className="flex flex-wrap justify-evenly">
                        {imageMetaPages.length > 0 &&
                            imageMetaPages[page - 1].map((meta) => {
                                return (
                                    <div
                                        key={meta.url}
                                        className="flex flex-col items-center justify-center border-2 m-1"
                                    >
                                        <PaddedImage
                                            key={meta.url}
                                            url={meta.url}
                                        />
                                        <ImageOptionButtons
                                            meta={meta}
                                            setImageMetaPages={
                                                setImageMetaPages
                                            }
                                            setTotalPages={setTotalPages}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </>
            )}
        </Layout>
    );
};
