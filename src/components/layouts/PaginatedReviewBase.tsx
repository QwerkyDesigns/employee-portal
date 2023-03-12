import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import { PaddedImage } from '@/components/images/PaddedImage';
import frontendClient from '@/lib/client/frontendClient';
import { UnCategorizedImageMeta, GetAllUntransferredResponse } from '@/lib/controllers/GetAllUntransferredController';
import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { batch } from '@/lib/utils/batch';
import { PresignedUrlWithMeta } from '@/types/sharedTypes';
import { Checkbox, NumberInput, Pagination, Text } from '@mantine/core';
import { IconArrowBigTop } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';

const DEFAULT_SHOW_NUMBER = 5;

type ImageKeyMap = {
    [key: string]: boolean;
};

export const PaginatedReviewBase = ({ origin }: { origin: ImageOrigin }) => {
    const router = useRouter();
    const [imageMetaPages, setImageMetaPages] = useState<UnCategorizedImageMeta[][]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showNumber, setShowNumber] = useState<number>(DEFAULT_SHOW_NUMBER);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageKeyMap, setImageKeyMap] = useState<ImageKeyMap>({});

    useEffect(() => {
        (async () => {
            const res = await frontendClient.get<GetAllUntransferredResponse>(`review/get-all-untransferred?origin=${origin}`);
            const filteredImageMetas = res.imageMetas.filter((x: PresignedUrlWithMeta) => !x.key.endsWith('meta.txt'));

            const batches = batch(filteredImageMetas, showNumber) as PresignedUrlWithMeta[][];

            const initialKeyMap: ImageKeyMap = {};
            filteredImageMetas.forEach((meta: PresignedUrlWithMeta) => {
                initialKeyMap[meta.key] = false;
            });

            setImageKeyMap(initialKeyMap);
            setImageMetaPages(batches);
            setTotalPages(batches.length);
        })();
    }, []);

    useEffect(() => {
        if (imageMetaPages && imageMetaPages.length > 0) {
            const unBatched = imageMetaPages.reduce((prev, current) => prev.concat(current));

            const batches = batch(unBatched, showNumber);

            setImageMetaPages(batches);
            setTotalPages(batches.length);
        }
    }, [showNumber]);

    const archive = async (key: string | null) => {
        setLoading(true);
        await frontendClient.post<{}, {}>(`archive/move-to-archive?imageKeys=${key === null ? getCheckImageKeys().join(',') : key}`);

        const res = await frontendClient.get<GetAllUntransferredResponse>(`review/get-all-untransferred?origin=${origin}`);
        const filteredImageMetas = res.imageMetas.filter((x: PresignedUrlWithMeta) => !x.key.endsWith('meta.txt'));
        const batches = batch(filteredImageMetas);

        const initialKeyMap: ImageKeyMap = {};
        filteredImageMetas.forEach((meta) => {
            initialKeyMap[meta.key] = false;
        });

        setImageKeyMap(initialKeyMap);
        setImageMetaPages(batches);
        setTotalPages(batches.length);
        setLoading(false);
    };

    const categorize = (key: string | null) => {
        const dest = `/portal/review/categorize?keys=${key === null ? getCheckImageKeys().join(',') : key}`;
        router.push(dest);
    };

    const getCheckImageKeys = () => {
        return Object.keys(imageKeyMap).filter((key: string) => imageKeyMap[key]);
    };

    return (
        <DashboardLayout pageName={`Review: ${origin}`}>
            {totalPages === 0 ? (
                <Text align="center">No uploaded images to review</Text>
            ) : (
                <>
                    <div className="mt-4 mb-4 flex h-full flex-col items-center justify-center">
                        <Pagination
                            className="bottom-0 flex flex-row items-end justify-end"
                            title="Image pages"
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
                        <div className="flex flex-row">
                            <ButtonWithSpinner
                                onClick={() => {
                                    categorize(null);
                                }}
                            >
                                Categorize Selected
                            </ButtonWithSpinner>
                            <ButtonWithSpinner
                                onClick={async () => {
                                    await archive(null);
                                }}
                            >
                                Archive Selected
                            </ButtonWithSpinner>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-evenly">
                        {imageMetaPages.length > 0 &&
                            imageMetaPages[page - 1].map((meta) => {
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
                                                        categorize(meta.key);
                                                    }}
                                                >
                                                    Categorize
                                                </ButtonWithSpinner>
                                                <ButtonWithSpinner
                                                    loading={loading}
                                                    onClick={() => {
                                                        archive(meta.key);
                                                    }}
                                                >
                                                    Archive
                                                </ButtonWithSpinner>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </>
            )}
        </DashboardLayout>
    );
};
