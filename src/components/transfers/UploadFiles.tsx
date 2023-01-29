import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, DropzoneProps, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import client from "@/lib/client/frontendAxiosClient";
import { SetState } from "@/types/sharedTypes";
import { GetPresignedPostResponse } from "@/lib/controllers/GetPresignedPostController";
import { HeaderKeys } from "@/lib/utils/constants";
import { useState } from "react";

export type PngImageDropzoneProps = Partial<DropzoneProps> & {
    setUploadedImages: SetState<string[]>;
    setLoading: SetState<boolean>;
};
const timer = 'timer'
export function PngImageDropzone({ setUploadedImages, setLoading, ...props }: PngImageDropzoneProps) {
    const theme = useMantineTheme();
    const [count, setCount] = useState<number>(0);

    const handleFileSave = async (files: FileWithPath[]) => {
        console.time(timer);
        setLoading(true);
        setCount(0);
        const filteredFiles = files.filter((x: File) => x);
        if (filteredFiles.length === 0) return;
        const recentlyUploadedUrls: string[] = [];
        for (let i = 0; i < filteredFiles.length; i++) {
            let currentFile = filteredFiles[i];
            let { path: _, ...rest } = currentFile;

            console.info("starting presigned");
            const result = await client.post<{ fileName: string }, GetPresignedPostResponse>(
                "/api/create/presigned-posts",
                {
                    fileName: currentFile.name,
                }
            );
            console.info("finished presigned: " + result);

            const data: { [key: string]: File | string } = {
                ...result.presignedUrlForUploading.fields,
                [HeaderKeys.ContentType]: "image/png",
                file: currentFile,
                "x-amz-acl": "public-read",
            };

            const formData = new FormData();
            for (const name in data) {
                formData.append(name, data[name]);
            }

            console.info("starting upload");
            await client.post<FormData, null>(result.presignedUrlForUploading.url, formData, {
                headers: {
                    [HeaderKeys.ContentType]: currentFile.type,
                },
            });
            console.info("finished upload");

            recentlyUploadedUrls.push(result.presignedForViewing);
            console.info("incrementing count");

            setCount(() => count + 1);
        }
        console.info("completing the upload and setting image urls");
        setUploadedImages(recentlyUploadedUrls);
        setLoading(false);
    };

    return (
        <>
            <span>{count}</span>
            <Dropzone
                onDrop={handleFileSave}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5000000} // 5mb
                accept={[MIME_TYPES.png]} // TODO
                maxFiles={4}
                multiple
                {...props}
            >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size={50}
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={50} stroke={1.5} color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={50} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </>
    );
}
