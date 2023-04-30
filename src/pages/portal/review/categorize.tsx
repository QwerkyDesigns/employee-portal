import { PaddedImage } from '@/components/images/PaddedImage';
import frontendClient from '@/lib/client/frontendClient';
import { GetSingleImageUrlResponse } from '@/lib/controllers/GetImageByKeyController';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { TextInput } from '@mantine/core';
import { CreateImageCategorizationRequest, CreateImageCategorizationResponse } from '@/lib/controllers/CategorizeAndUploadController';
import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { RegisteredTargetsResponse } from '@/lib/controllers/RegisteredTargetsController';
import MultipleSelect from '@/components/select/MultiSelect';
import { Option } from "react-multi-select-component";

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export default function CategorizePage() {
    const router = useRouter();
    const { keys } = router.query;

    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [text, setText] = useState<string>('');

    const [selectOptions, setSelectOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<Option[]>([]);

    useEffect(() => {
        (async () => {
            // retrieve registered targets for sending images around - thie request will send to the api to lookup all the services for which we have an API key (like printify, etc)
            const res = await frontendClient.get<RegisteredTargetsResponse>("categorize/registered-targets")
            const ts: Option[] = res.targets.map(t => {
                return { value: t, label: t.toLocaleUpperCase() }
            });
            setSelectOptions(ts);
        })()
    }, [])


    useEffect(() => {
        (async () => {
            const url = queryString.stringifyUrl({
                url: 'review/get-by-image-key',
                query: { keys: keys }
            });
            const res = await frontendClient.get<GetSingleImageUrlResponse>(url);
            const { urls: decodedUrls } = queryString.parse(res.urls);
            if (decodedUrls && typeof decodedUrls === 'string') {
                const urlList = decodedUrls.split(',');
                setImages(urlList);
            }
        })();
    }, [keys]);

    return (
        <DashboardLayout pageName="Categorize">
            <>
                {images && (
                    <div className="m-3 flex flex-row justify-center">
                        {images.map((url) => {
                            return <PaddedImage key={url} url={url} />;
                        })}
                    </div>
                )}
                <TextInput
                    style={{ marginTop: '4rem' }}
                    placeholder="Delectible Soup"
                    label="Give your new printable product image a name (this will be the item name in the store)"
                    withAsterisk
                    multiple
                    value={text}
                    onChange={(event) => {
                        event.preventDefault();
                        setText(event.target.value);
                    }}
                />

                <MultipleSelect options={selectOptions} selected={selected} setSelected={setSelected} />

                <ButtonWithSpinner
                    loading={loading}
                    onClick={async () => {
                        setLoading(true);
                        if (keys && typeof keys === 'string') {
                            const res = await frontendClient.post<CreateImageCategorizationRequest, CreateImageCategorizationResponse>(
                                'categorize/categorize-and-upload',
                                {
                                    imageKeys: keys,
                                    friendlyNames: keys.split(',').map((_, i) => text + '-' + i).join(),
                                    targets: selected.map(x => x.value)
                                }
                            );
                            router.push('/review/dalle');
                        }
                        setLoading(false);
                    }}
                >
                    Submit to create new images
                </ButtonWithSpinner>
            </>
        </DashboardLayout>
    );
}
