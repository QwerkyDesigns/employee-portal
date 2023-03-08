import StripeEventsCustomBullshit from "@/lib/bullshit/StripeEvents";
import Stripe from "stripe";
import { updateUsageLimit } from "./UsageUpdateService";
import { prisma } from "@/lib/client/prisma";
import { Logger } from "nextjs-backend-helpers";
import { z } from "zod";

export interface IStripeWebhookHandler {
    handleWebhookEvent(event: any, signature: string): void;
}

const successfulPaymentSchema = z.object({
    amount: z.number().positive(),
    customer: z.object({
        id: z.string().min(1)
    })
});

type SuccessfulPayment = z.infer<typeof successfulPaymentSchema>;

class StripeEventParseError extends Error {
    constructor() {
        super('Error while parsing incoming stripe payment event');
    }
}

async function castToSuccessfulStripePayment(incoming: Record<string, any>): Promise<SuccessfulPayment> {
    const result = await successfulPaymentSchema.safeParseAsync(incoming);

    if (result.success === false) {
        Logger.error({
            message: 'error while casting incoming stripe payment',
            errors: result.error.flatten()
        });

        throw new StripeEventParseError();
    }

    return incoming as SuccessfulPayment;
}

export async function isReplyAttack(signature: string) {
    const previouswebhooks = await prisma.stripeWebhooks.count({
        where: {
            payloadSignature: signature,
        },
    });

    return previouswebhooks !== 0;
}

export async function handleWebhookEvent(event: Stripe.Event, signature: string) {
    const eventType = event.type;

    if (await isReplyAttack(signature)) {
        Logger.warn({
            message: 'Found a stripe replay - could be malicious. Returning and not processing.'
        });

        return;
    }

    await prisma.stripeWebhooks.create({
        data: {
            payloadSignature: signature,
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
            const paymentIntentSucceeded = await castToSuccessfulStripePayment(event.data.object);
            const fundsAdded = paymentIntentSucceeded.amount;
            const customerId = paymentIntentSucceeded.customer.id;
            updateUsageLimit(customerId, fundsAdded);
            break;

        case StripeEventsCustomBullshit.PaymentIntentPaymentFailed:
            break;

        // TODO: ... handle other event types

        default:
            Logger.debug({ message: `Unhandled event type ${event.type}` });
    }
}
