import { UnTransferredImageMeta } from "@/lib/controllers/GetAllUntransferredController";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

export const ImageOptionButtons = ({ meta }: { meta: UnTransferredImageMeta }) => {
    const router = useRouter();

    const archive = (key: string) => {
        console.log("Archiving");
        router.push(`/archive/all-archived?key=${key}`);
    };

    const categorize = (key: string) => {
        console.log("Categorizing");
        router.push(`/review/categorize?key=${key}`);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button onClick={() => categorize(meta.key)}>Categorize and Sell</Button>
            <Button onClick={() => archive(meta.key)}>Archive</Button>
        </div>
    );
};
