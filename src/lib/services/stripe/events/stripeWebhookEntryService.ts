import StripeEventsCustomBullshit from '@/lib/bullshit/StripeEvents';
import Stripe from 'stripe';
import { updateUsageLimit } from '../UsageUpdateService';
import { prisma } from '@/lib/client/prisma';
import { Logger } from 'nextjs-backend-helpers';
import { isReplyAttack } from './replayDetection';

export async function handleWebhookEvent(event: Stripe.Event, signature: string) {
    if (await isReplyAttack(signature)) {
        Logger.warn({
            message: 'Found a stripe replay - could be malicious. Returning and not processing.'
        });

        return;
    }

    await prisma.stripeWebhooks.create({
        data: {
            payloadSignature: signature
        }
    });

    switch (event.type) {
        case StripeEventsCustomBullshit.PaymentIntentSucceeded:
            const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
            const fundsAdded = paymentIntentSucceeded.amount;
            const customerId = (paymentIntentSucceeded.customer ?? 'cus_NT3Q8CV9Ayl59L') as string; // in dev, this is null, so what to do?
            updateUsageLimit(customerId, fundsAdded);
            break;

        case StripeEventsCustomBullshit.PaymentIntentPaymentFailed:
            break;

        // TODO: ... handle other event types

        default:
            Logger.debug({ message: `Unhandled event type ${event.type}` });
    }
}
