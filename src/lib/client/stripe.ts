import Stripe from 'stripe';
import { env } from '@/env/server.mjs';

const stripeApiKey = env.STRIPE_API_KEY;
const stripeBackendClient = new Stripe(stripeApiKey, {
    apiVersion: '2022-11-15'
});

export default stripeBackendClient;
