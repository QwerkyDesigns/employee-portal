import StripeEventsCustomBullshit from "@/lib/bullshit/StripeEvents";
import Stripe from "stripe";
import UsageUpdateService from "./UsageUpdateService";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@/lib/client/prisma";

export interface IStripeWebhookHandler {
    HandleWebhookEvent(event: any, signature: string): void;
}

class StripeWebhookHandler implements IStripeWebhookHandler {
    public readonly db: PrismaClient;

    constructor() {
        this.db = prismaClient;
    }

    private async LookForReplayAttacks(signature: string) {
        const previouswebhooks = await this.db.stripeWebhookReplays.findMany({
            where: {
                payload_signature: signature,
            },
        });

        return previouswebhooks.length === 0;
    }

    public async HandleWebhookEvent(event: Stripe.Event, signature: string) {
        const eventType = event.type;

        const shouldProcess = await this.LookForReplayAttacks(signature);
        if (!shouldProcess) {
            console.log("Found a stripe replay - could be malicious. Returning and not processing.");
            return;
        }

        await this.db.stripeWebhookReplays.create({
            data: {
                payload_signature: signature,
            },
        });

        // Validate the event type
        if (!(eventType in StripeEventsCustomBullshit)) {
            console.warn(`⚠️ Unrecognized Stripe event type "${eventType}"`);
            throw new Error(`⚠️ Unrecognized Stripe event type "${eventType}"`);
        }

        // Handle the event
        switch (event.type) {
            case StripeEventsCustomBullshit.PaymentIntentSucceeded:
                const paymentIntentSucceeded = event.data.object; // TODO: as TYPE THIS SHIT PLZ;
                // get the customerId - retrieve the account, get the accountId, retrieve the Usage, update the usage
                const usageService = new UsageUpdateService();
                const fundsAdded = paymentIntentSucceeded.amount; // TODO: This type to be fixed
                const customerId = paymentIntentSucceeded.customer.id; // TODO: This too
                usageService.UpdateUsageLimit(fundsAdded, customerId);
                break;

            case StripeEventsCustomBullshit.PaymentIntentPaymentFailed:
                const paymentIntentFailed = event.data.object;
                // TODO: do some shit like send an email or feedback to the portal
                break;

            // TODO: ... handle other event types

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
}

export default StripeWebhookHandler;
