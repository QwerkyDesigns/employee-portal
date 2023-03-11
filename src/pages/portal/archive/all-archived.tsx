import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import { PaddedImage } from '@/components/images/PaddedImage';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import frontendClient from '@/lib/client/frontendClient';
import { GetAllArchivedResponse } from '@/lib/controllers/GetAllArchivedImagesController';
import { PresignedUrlWithMeta } from '@/lib/stores/s3Core/S3Core';
import { batch } from '@/lib/utils/batch';
import { Checkbox, NumberInput, Pagination } from '@mantine/core';
import { IconArrowBigTop } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DEFAULT_SHOW_NUMBER = 5;

type ImageKeyMap = {
    [key: string]: boolean;
};

export default function AllArchivedPage() {
    const router = useRouter();

    const [imageUrlPages, setImageUrlPages] = useState<PresignedUrlWithMeta[][]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageKeyMap, setImageKeyMap] = useState<ImageKeyMap>({});
    const [showNumber, setShowNumber] = useState<number>(DEFAULT_SHOW_NUMBER);

    useEffect(() => {
        (async () => {
            const res = await frontendClient.get<GetAllArchivedResponse>(`archive/get-all-archived`);
            const filteredImageMetas = res.imageMetas.filter((x) => !x.key.endsWith('meta.txt'));

            const batches = batch(filteredImageMetas);

            const initialKeyMap: ImageKeyMap = {};
            filteredImageMetas.forEach((meta) => {
                initialKeyMap[meta.key] = false;
            });

            setImageKeyMap(initialKeyMap);
            setImageUrlPages(batches);
            setTotalPages(batches.length);
        })();
    }, []);

    const categorize = (key: string | null) => {
        const dest = `/review/categorize?keys=${key === null ? getCheckImageKeys().join(',') : key}`;
        router.push(dest);
    };
    const getCheckImageKeys = () => {
        return Object.keys(imageKeyMap).filter((key) => imageKeyMap[key]);
    };
    return (
        <DashboardLayout pageName="Archived Photos">
            <div className="mt-4 mb-4 flex h-full flex-col items-center justify-center">
                <Pagination
                    page={page}
                    onChange={(p) => {
                        setPage(p);
                    }}
                    total={totalPages}
                />
                <NumberInput
                    className="m-3"
                    defaultValue={DEFAULT_SHOW_NUMBER}
                    label="Number of images to show per page"
                    onChange={(val) => {
                        if (val) {
                            setShowNumber(val);
                        }
                    }}
                />
            </div>
            <div className="flex flex-wrap justify-evenly">
                {imageUrlPages.length > 0 &&
                    imageUrlPages[page - 1].map((meta) => {
                        return (
                            <div key={meta.key} className="m-1 border-2">
                                <Checkbox
                                    size="lg"
                                    checked={imageKeyMap[meta.key]}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setImageKeyMap((prev) => {
                                            prev[meta.key] = isChecked;
                                            return { ...prev };
                                        });
                                    }}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <PaddedImage key={meta.url} url={meta.url} />
                                    <div className="flex flex-row justify-evenly">
                                        <ButtonWithSpinner
                                            icon={<IconArrowBigTop size={14} />}
                                            loading={loading}
                                            onClick={() => {
                                                setLoading(true);
                                                categorize(meta.key);
                                                setLoading(false);
                                            }}
                                        >
                                            Categorize
                                        </ButtonWithSpinner>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </DashboardLayout>
    );
}
