import stripeBackendClient from "@/lib/client/stripe";
import env from "@/lib/environment/Environment";
import { EnvironmentVariable } from "@/lib/environment/EnvironmentVariable";
import StripeSignatureError from "@/lib/errors/application-errors/StripeSignatureError";
import { handleWebhookEvent  } from "@/lib/services/stripe/stripeWebhookEntryService";
import { NextApiRequest, NextApiResponse } from "next/types";
import { errors } from "nextjs-backend-helpers";
import { Controller } from "nextjs-backend-helpers/controller";

const endpointSecret = env.GetStringEnvironmentVarialble(EnvironmentVariable.StripeWebhookSecret);
// This is an unauthenticated stripe webhook controller
// we'll add middleware on to this to reject any request that does not
// contain the required headers from stripe
class StripeWebhookController extends Controller {

    constructor() {
        super();
        // we should avoid assigning instance variables like this.
        // in .NET you _have_ to use instance variables because everything is class based
        // but in Node we have a module system
        // Jest can mock module imports during tests, which
        // means we can totally skip the complexities of DI,
        // which isn't as smooth as it is in JS as it is in .NET
        // in our tests, we can swap out handleWebhookEvent with a mock

        // this.stripeWebhookHandler = new StripeWebhookHandler(); // Can we use injectify-js or something to that event to inject dependencies? That would be nice (not sure about compatibility with the controllers

        this.before((error, request, response) => {
            // do a check on the request headers and look for the
        });

        this.rescue(StripeSignatureError, (err, req, res) => {
            res.status(400).json(errors([err.constructor.name, err.message]))
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<StripeWebhookResponse>) {
        const sig = req.headers["stripe-signature"] as string;

        if (typeof sig !== "string") {
            throw new StripeSignatureError("Errors everywhere!?");
        }

        try {
            const event = stripeBackendClient.webhooks.constructEvent(req.body, sig, endpointSecret);
            await handleWebhookEvent(event, sig);
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
    }
}

export type StripeWebhookRequest = {};

export type StripeWebhookResponse = {};

export default StripeWebhookController;
