import { client } from "@/lib/client/client";
import { useState } from "react";
import { useQuery } from "react-query";

const TextSendRoutes = {
  sendTextForConversion: {
    sendText: "send-text",
  },
};

export const useTextSender = ({text: string}) => {
  const [error, setError] = useState<Error | null>(null);

  const { data: imageData, status } = useQuery(
    "SendText",
    () => client.post<ImageData>(TextSendRoutes.sendTextForConversion.sendText),
    { onError: (error: Error) => setError(error) }
  );

  return {
    imageData,
    error,
    status,
  };
};



