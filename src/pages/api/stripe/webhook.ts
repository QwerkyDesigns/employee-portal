import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import stripeBackendClient from "@/lib/client/stripe";
import { getStripeHeader } from "@/lib/controllers/stripe/headers";
import { handleWebhookEvent } from "@/lib/services/stripe/events/stripeWebhookEntryService";

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
// This is an unauthenticated stripe webhook controller
// we'll add middleware on to this to reject any request that does not
// contain the required headers from stripe
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === "POST") {
        const sig = getStripeHeader<string>(req);

        try {
            const body = await buffer(req);
            const event = stripeBackendClient.webhooks.constructEvent(body, sig, webhookSecret);
            await handleWebhookEvent(event, sig);
        } catch (err: any) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const buffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on("data", (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        req.on("error", reject);
    });
};

export default handler;

// import StripeWebhookController from "@/lib/controllers/stripe/StripeWebhookController";
// import { install } from "nextjs-backend-helpers";

// export default install(StripeWebhookController);
