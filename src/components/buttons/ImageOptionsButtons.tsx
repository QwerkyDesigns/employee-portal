import frontendClient from '@/lib/client/frontendClient';
import {
  GetAllUntransferredResponse,
  UnCategorizedImageMeta,
} from '@/lib/controllers/GetAllUntransferredController';
import { ImageOrigin } from '@/lib/enums/ImageOrigin';
import { batch } from '@/lib/utils/batch';
import { SetState } from '@/types/sharedTypes';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ButtonWithSpinner } from './ButtonWithSpinner';

export const ImageOptionButtons = ({
  meta,
  setImageMetaPages,
  setTotalPages,
  origin,
}: {
  meta: UnCategorizedImageMeta;
  setImageMetaPages: SetState<UnCategorizedImageMeta[][]>;
  setTotalPages: SetState<number>;
  origin: ImageOrigin;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const archive = async (key: string) => {
    setLoading(true);
    await frontendClient.post<{}, {}>(
      `archive/move-to-archive?imageKey=${key}`
    );

    const res = await frontendClient.get<GetAllUntransferredResponse>(
      `review/get-all-untransferred?origin=${origin}`
    );

    const batches = batch(
      res.imageMetas.filter((x) => !x.key.endsWith('meta.txt'))
    );

    setImageMetaPages(batches);
    setTotalPages(batches.length);
    setLoading(false);
  };

  const categorize = (key: string) => {
    router.push(`/review/categorize?key=${key}`);
  };
  return (
    <div className="flex flex-row justify-evenly">
      <ButtonWithSpinner loading={loading} onClick={() => categorize(meta.key)}>
        Categorize
      </ButtonWithSpinner>
      <ButtonWithSpinner loading={loading} onClick={() => archive(meta.key)}>
        Archive
      </ButtonWithSpinner>
    </div>
  );
};
