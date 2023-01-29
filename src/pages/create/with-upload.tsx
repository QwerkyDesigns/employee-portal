import Layout from "@/components/Layout";
import { PngImageDropzone } from "@/components/transfers/UploadFiles";
import { useState } from "react";
import Image from "next/image";

export default function UploadImages() {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    return (
        <Layout pageName="Upload your images">
            <>
                <PngImageDropzone setUploadedImages={setUploadedImages} />
                <div style={{ height: "3rem" }} />
                {uploadedImages.map((src, i) => (
                    <div key={src}>
                        <Image height={400} width={400} src={src} alt="wow" />
                    </div>
                ))}
            </>
        </Layout>
    );
}
