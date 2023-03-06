import { NextApiRequest } from "next";

export function getStripeHeader<T = unknown>(req: NextApiRequest) {
  return req.headers["stripe-signature"] as T;
}
