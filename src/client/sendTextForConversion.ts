import { useState } from "react";
import { useQuery } from "react-query";
import { client } from "./client";

const TextSendRoutes = {
  sendTextForConversion: {
    sendText: "send-text",
  },
};

export const useTextSender = () => {
  const [error, setError] = useState<Error | null>(null);

  const { data: imageData, status } = useQuery(
    "SendText",
    () => client.get<ImageData>(TextSendRoutes.sendTextForConversion.sendText),
    { onError: (error: Error) => setError(error) }
  );

  return {
    imageData,
    error,
    status,
  };
};
