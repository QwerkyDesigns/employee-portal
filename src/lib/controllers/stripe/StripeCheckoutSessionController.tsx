import stripeBackendClient from '@/lib/client/stripe';
import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { AuthenticatedBaseController } from '../base/AuthenticatedBaseController';
import Stripe from 'stripe';
import { prisma } from '@/lib/client/prisma';
import { env } from '@/env/server.mjs';
import { Logger } from 'nextjs-backend-helpers';

const hostUrl = env.NEXTAUTH_URL;

const success_url = `${hostUrl}/portal/stripe/success`;
const cancel_url = `${hostUrl}/portal/stripe/cancel`;

class StripeCheckoutSessionController extends AuthenticatedBaseController {
    async post(req: NextApiRequest, res: NextApiResponse<StripeCheckoutSessionResponse>) {
        const session = await getSession({ req });
        const userEmail = session?.user?.email;
        if (userEmail === null) {
            throw new Error('Email not found!');
        }

        const account = await prisma.account.findUnique({
            where: { email: userEmail }
        });

        const stripeCustomerId = account?.stripeCustomerId;
        if (stripeCustomerId === null) throw new Error('Stripe Customer ID not found!');

        // TODO: Hard coding the test stripe price product here for the moment. This exists now in the test stripe account
        try {
            const checkoutSession = await stripeBackendClient.checkout.sessions.create({
                line_items: [{ price: 'price_1MhnobBuP1CjbxCnFeWwttQN', quantity: 1 }],
                cancel_url,
                success_url,
                mode: 'payment',
                payment_method_types: ['card']
            });
            return res.json({ session: checkoutSession });
        } catch (err) {
            Logger.error({
                message: 'Error attempting to create a checkout session. No charge was made.'
            });
            return;
        }
    }
}

export type StripeCheckoutSessionRequest = {};

export type StripeCheckoutSessionResponse = {
    session: Stripe.Checkout.Session;
};

export default StripeCheckoutSessionController;
