import { PaddedImage } from "@/components/images/PaddedImage";
import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import { GetAllArchivedResponse } from "@/lib/controllers/GetAllArchivedImagesController";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export default function AllArchivedPage() {
  const [imageUrls, setImageurls] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await frontendClient.get<GetAllArchivedResponse>(
        `archive/get-all-archived`
      );
      setImageurls(res.urls);
    })();
  }, []);

  return (
    <Layout pageName="Archived Photos">
      {imageUrls &&
        imageUrls.map((url) => {
          return (
            <div
              key={url}
              style={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PaddedImage url={url} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button>Categorize and Sell</Button>
                <Button disabled>Delete Forever</Button>
                {/* We don't allow deleting just yet */}
              </div>
            </div>
          );
        })}
    </Layout>
  );
}
