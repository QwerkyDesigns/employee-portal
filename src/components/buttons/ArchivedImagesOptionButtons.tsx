import { UnCategorizedImageMeta } from '@/lib/controllers/GetAllUntransferredController';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';

export const ArchivedImagesOptionButtons = ({ meta }: { meta: UnCategorizedImageMeta }) => {
    const router = useRouter();
    const categorize = (key: string) => {
        router.push(`/review/categorize?key=${key}`);
    };

    return (
        <div className="flex flex-row justify-evenly">
            <Button className="text-text bg-primary m-1 text-lg" onClick={() => categorize(meta.key)}>
                Categorize
            </Button>
        </div>
    );
};
