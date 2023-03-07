import { env } from "@/env/client.mjs";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripeFrontend = loadStripe(publishableKey);

export default stripeFrontend;
