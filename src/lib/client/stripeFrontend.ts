import { loadStripe } from "@stripe/stripe-js";
import env from "../environment/Environment";
import { EnvironmentVariable } from "../environment/EnvironmentVariable";

// const stripeApiKey = env.GetStringEnvironmentVarialble(EnvironmentVariable.StripeApiKey);

//TODO: Adam - fucking javascript. I THINK we've got two different stripe libraries to work with
// that do slightly different things. Help me sort this shit out.
// the stripe frontend here gives us this method 'redirectToCheckout' which we need.
// I THINK this is a helper library? Official? fucking confused atm. hehe

// I CAN SHOW YOU HOW I DID THIS PALAVYR. Though - that wasn't a nextjs app, but maybe we can just do the same thing here again.
// I SUSPECT - the stripeClient I've created is suitable for a nodejs server,
// whereas this 'loadStripe' method (which is what I used in the Palavyr frontend) is used for the frontend business

// anyways - thats whats up here.

// Also, there is the 'secret_key' and 'publishable_key' in stripe. Don't actually recall using the publishable one
// --------------------------------------------------------  //

// const stripeFrontend = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// const stripeFrontend = loadStripe(stripeApiKey);

const publishableKey = ""; // [Check Lastpass]
const stripeFrontend = loadStripe(publishableKey);

export default stripeFrontend;
