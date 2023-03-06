import { StatusCodes } from "@/lib/enums/StatusCodes";
import StripeSignatureError from "@/lib/errors/application-errors/StripeSignatureError";
import { NextApiRequest, NextApiResponse } from "next";
import { error } from "nextjs-backend-helpers";
import { getStripeHeader } from "./headers";
import { StripeWebhookResponse } from "./StripeWebhookController";

export function hasStripeHeader(req: NextApiRequest, res: NextApiResponse<StripeWebhookResponse>, stop: () => void) {
  const sig = getStripeHeader(req)

  if (typeof sig !== "string") {
      stop()
      res.status(StatusCodes.InvalidRequest).json(error('invalid request'))
      throw new StripeSignatureError("Errors everywhere!?");
  }
}
