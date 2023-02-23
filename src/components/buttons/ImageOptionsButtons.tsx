import frontendClient from "@/lib/client/frontendClient";
import {
    GetAllUntransferredResponse,
    UnCategorizedImageMeta,
} from "@/lib/controllers/GetAllUntransferredController";
import { ImageOrigin } from "@/lib/enums/ImageOrigin";
import { batch } from "@/lib/utils/batch";
import { SetState } from "@/types/sharedTypes";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

export const ImageOptionButtons = ({
    meta,
    setImageMetaPages,
    setTotalPages,
}: {
    meta: UnCategorizedImageMeta;
    setImageMetaPages: SetState<UnCategorizedImageMeta[][]>;
    setTotalPages: SetState<number>;
}) => {
    const router = useRouter();

    const archive = async (key: string) => {
        await frontendClient.post<{}, {}>(`archive/move-to-archive?imageKey=${key}`);

        const res = await frontendClient.get<GetAllUntransferredResponse>(
            `review/get-all-untransferred?origin=${ImageOrigin.Upload}`
        );

        const batches = batch(
            res.imageMetas.filter((x) => !x.key.endsWith("meta.txt")),
            5
        );

        setImageMetaPages(batches);
        setTotalPages(batches.length);
    };

    const categorize = (key: string) => {
        router.push(`/review/categorize?key=${key}`);
    };
    return (
        <div className="flex flex-row justify-evenly">
            <Button
                className="text-lg text-text bg-primary m-1"
                onClick={() => categorize(meta.key)}
            >
                Categorize
            </Button>
            <Button
                className="text-lg text-text bg-primary m-1"
                onClick={() => archive(meta.key)}
            >
                Archive
            </Button>
        </div>
    );
};
