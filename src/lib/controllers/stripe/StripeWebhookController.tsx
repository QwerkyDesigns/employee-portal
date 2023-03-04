import stripe from "@/lib/client/stripe";
import StripeWebhookEntrypoint from "@/lib/services/stripe/stripeWebhookEntryService";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Controller } from "nextjs-backend-helpers/controller";

import Stripe from 'stripe';

// This is an unauthenticated stripe webhook controller
// we'll add middleware on to this to reject any request that does not
// contain the required headers from stripe
class StripeWebhookController extends Controller {
  private readonly stripeWebhookHandler: StripeWebhookEntrypoint

    constructor() {
        super();
        this.stripeWebhookHandler = new StripeWebhookEntrypoint(); // Can we use injectify-js or something to that event to inject dependencies? That would be nice (not sure about compatibility with the controllers

        this.before((error, request, response) => {
            // do a check on the request headers and look for the
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<StripeWebhookResponse>) {

        const goodStripe = new Stripe("", {});

        const sig = req.headers['stripe-signature'];

        let event;
      
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err: Error) {
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }

        try {
          await stripeWebhookHandler.
        }

      
        // Handle the event
        switch (event.type) {
          case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`);
    }
}

export type StripeWebhookRequest = {};

export type StripeWebhookResponse = {};

export default StripeWebhookController;
