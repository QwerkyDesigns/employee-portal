import StripeEventsCustomBullshit from "@/lib/bullshit/StripeEvents";
import Stripe from "stripe";
import UsageUpdateService from "./UsageUpdateService";
import { prisma } from "@/lib/client/prisma";
import { Logger } from "nextjs-backend-helpers";

export interface IStripeWebhookHandler {
    handleWebhookEvent(event: any, signature: string): void;
}

type SuccessfulPayment = {
    amount: number,
    customer: {
        id: string
    }
}

export async function lookForReplayAttacks(signature: string) {
    const previouswebhooks = await prisma.stripeWebhooks.findMany({
        where: {
            payload_signature: signature,
        },
    });

    return previouswebhooks.length === 0;
}

export async function handleWebhookEvent(event: Stripe.Event, signature: string) {
    const eventType = event.type;

    const shouldProcess = await lookForReplayAttacks(signature);
    if (!shouldProcess) {
        Logger.debug({
            message: 'Found a stripe replay - could be malicious. Returning and not processing.'
        });
        return;
    }

    await prisma.stripeWebhooks.create({
        data: {
            payload_signature: signature,
        },
    });

    // Validate the event type
    if (!(eventType in StripeEventsCustomBullshit)) {
        Logger.warn({
            message: `⚠️ Unrecognized Stripe event type "${eventType}"`
        });
        throw new Error(`⚠️ Unrecognized Stripe event type "${eventType}"`);
    }

    // Handle the event
    switch (event.type) {
        case StripeEventsCustomBullshit.PaymentIntentSucceeded:
            const paymentIntentSucceeded = event.data.object as SuccessfulPayment; // TODO: as TYPE THIS SHIT PLZ;
            // get the customerId - retrieve the account, get the accountId, retrieve the Usage, update the usage
            const usageService = new UsageUpdateService();
            const fundsAdded = paymentIntentSucceeded.amount; // TODO: This type to be fixed
            const customerId = paymentIntentSucceeded.customer.id; // TODO: This too
            usageService.UpdateUsageLimit(customerId, fundsAdded);
            break;

        case StripeEventsCustomBullshit.PaymentIntentPaymentFailed:
            break;

        // TODO: ... handle other event types

        default:
            Logger.debug({ message: `Unhandled event type ${event.type}` });
    }
}
