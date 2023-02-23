import { ImageOptionButtons } from "@/components/buttons/ImageOptionsButtons";
import { PaddedImage } from "@/components/images/PaddedImage";
import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import { GetAllArchivedResponse } from "@/lib/controllers/GetAllArchivedImagesController";
import { PresignedUrlWithMeta } from "@/lib/stores/s3Core/S3Core";
import { batch } from "@/lib/utils/batch";
import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

export default function AllArchivedPage() {
    const [imageUrlPages, setImageUrlPages] = useState<
        PresignedUrlWithMeta[][]
    >([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const res = await frontendClient.get<GetAllArchivedResponse>(
                `archive/get-all-archived`
            );

            const batches = batch(
                res.imageMetas.filter((x) => !x.key.endsWith("meta.txt")),
                5
            );
            setImageUrlPages(batches);
            setTotalPages(batches.length);
        })();
    }, []);

    return (
        <Layout pageName="Archived Photos">
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
                {imageUrlPages.length > 0 &&
                    imageUrlPages[page - 1].map((meta) => {
                        return (
                            <div
                                key={meta.url}
                                className="flex flex-col items-center justify-center border-2 m-1"
                            >
                                <PaddedImage key={meta.url} url={meta.url} />
                                <ImageOptionButtons meta={meta} />
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
}
