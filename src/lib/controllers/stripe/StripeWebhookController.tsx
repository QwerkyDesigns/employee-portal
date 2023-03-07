import stripeBackendClient from "@/lib/client/stripe";

import StripeSignatureError from "@/lib/errors/application-errors/StripeSignatureError";
import { handleWebhookEvent } from "@/lib/services/stripe/stripeWebhookEntryService";
import { NextApiRequest, NextApiResponse } from "next/types";
import { errors, error, Logger } from "nextjs-backend-helpers";
import { Controller } from "nextjs-backend-helpers/controller";
import { getStripeHeader } from "./headers";
import { hasStripeHeader } from "./middleware";
import { StatusCodes } from "@/lib/enums/StatusCodes";
import { env } from "../../../env/server.mjs";

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;
// This is an unauthenticated stripe webhook controller
// we'll add middleware on to this to reject any request that does not
// contain the required headers from stripe
class StripeWebhookController extends Controller {
    constructor() {
        super();

        this.rescue(StripeSignatureError, (err, _req, res) => {
            res.status(400).json(errors([err.constructor.name, err.message]));
        });

        // this.before(hasStripeHeader).only("post"); // temp comment
    }

    async post(req: NextApiRequest, res: NextApiResponse<StripeWebhookResponse>) {
        console.log("WE HIT THE STRIPE WEBHOOK ENDPOINT");
        console.log(req.headers);

        const sig = getStripeHeader<string>(req);

        console.log(sig);
        try {
            const event = stripeBackendClient.webhooks.constructEvent(req.body, sig, endpointSecret);
            await handleWebhookEvent(event, sig);
        } catch (err: any) {
            const errr = err as Error;

            Logger.error({
                message: "Webhook Error",
                error: errr.message,
                errorName: errr.name,
            });

            res.status(StatusCodes.InvalidRequest).json(error(`Webhook Error: ${err.message}`));

            return;
        }
    }
}

export type StripeWebhookRequest = {};

export type StripeWebhookResponse = {};

export default StripeWebhookController;
