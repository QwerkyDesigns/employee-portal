import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, DropzoneProps, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import client from "@/lib/client/frontendAxiosClient";
import { SetState } from "@/types/sharedTypes";
import { GetPresignedPostResponse } from "@/lib/controllers/GetPresignedPostController";
import { HeaderKeys } from "@/lib/utils/constants";

export type PngImageDropzoneProps = Partial<DropzoneProps> & {
    setUploadedImages: SetState<string[]>;
};

export function PngImageDropzone({ setUploadedImages, ...props }: PngImageDropzoneProps) {
    const theme = useMantineTheme();

    const [files, setFiles] = useState<FileWithPath[]>([]);

    const handleFileSave = async (e: any) => {
        e.preventDefault();

        const filteredFiles = files.filter((x: File) => x);
        if (filteredFiles.length === 0) return;

        const recentlyUploadedUrls: string[] = [];
        for (let i = 0; i < filteredFiles.length; i++) {
            let currentFile = filteredFiles[i];
            let { path: _, ...rest } = currentFile;

            const result = await client.post<{ fileName: string }, GetPresignedPostResponse>(
                "/api/create/presigned-posts",
                {
                    fileName: currentFile.name,
                }
            );
            console.log(result);

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

            await client.post<FormData, null>(result.presignedUrlForUploading.url, formData, {
                headers: {
                    [HeaderKeys.ContentType]: currentFile.type,
                },
            });

            recentlyUploadedUrls.push(result.presignedForViewing);
        }
        console.log(recentlyUploadedUrls);
        setUploadedImages(recentlyUploadedUrls);
    };

    const FiveMB = 3 * 1024 ** 2;

    const onDrop = (files: FileWithPath[]) => {
        setFiles(files);
    };

    const handleRemoveFile = (e: any, f: FileWithPath) => {
        e.preventDefault();

        const filteredFiles = files.filter((fi) => fi.path !== f.path);
        setFiles(filteredFiles);
    };

    const handleFilesClear = (e: any) => {
        e.preventDefault();
        setFiles([]);
    };

    return (
        <>
            <Dropzone
                onDrop={onDrop}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={FiveMB}
                accept={[MIME_TYPES.png]}
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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Text variant="text" size="xl">
                    Images to upload
                </Text>
                {files.map((f, i) => {
                    return (
                        <div key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span>{f.name}</span>
                            <Button onClick={(e) => handleRemoveFile(e, f)}>Remove</Button>
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Button onClick={handleFileSave}>Save selected images</Button>
                <Button onClick={handleFilesClear}>Clear All files</Button>
            </div>
        </>
    );
}
