import { UnTransferredImageMeta } from "@/lib/controllers/GetAllUntransferredController";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

export const ImageOptionButtons = ({
  meta,
}: {
  meta: UnTransferredImageMeta;
}) => {
  const router = useRouter();

  const archive = (key: string) => {
    console.log("Archiving");
    router.push(`/archive/all-archived?key=${key}`);
  };

  const categorize = (key: string) => {
    console.log("Categorizing");
    router.push(`/review/categorize?key=${key}`);
  };
  const buttonStyles = "mr-2 ml-2";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Button
        className={buttonStyles}
        size="sm"
        onClick={() => categorize(meta.key)}
      >
        Categorize
      </Button>
      <Button
        className={buttonStyles}
        size="sm"
        onClick={() => archive(meta.key)}
      >
        Archive
      </Button>
    </div>
  );
};
