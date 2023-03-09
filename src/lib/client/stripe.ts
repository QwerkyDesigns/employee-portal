import Stripe from 'stripe';
import env from '../environment/Environment';
import { EnvironmentVariable } from '../environment/EnvironmentVariable';

const stripeApiKey = env.GetStringEnvironmentVarialble(EnvironmentVariable.StripeApiKey);

const stripeBackendClient = new Stripe(stripeApiKey, {
    apiVersion: '2022-11-15'
});

export default stripeBackendClient;
