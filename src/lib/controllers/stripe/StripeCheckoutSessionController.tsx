import stripeBackendClient from "@/lib/client/stripe";
import env from "@/lib/environment/Environment";
import { EnvironmentVariable } from "@/lib/environment/EnvironmentVariable";
import { useSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import { AuthenticatedBaseController } from "../base/AuthenticatedBaseController";
import Stripe from "stripe";

const success_url = `${env.GetStringEnvironmentVarialble(EnvironmentVariable.HostUrl)}/stripe/success`;
const cancel_url = `${env.GetStringEnvironmentVarialble(EnvironmentVariable.HostUrl)}/stripe/cancel`;

class StripeCheckoutSessionController extends AuthenticatedBaseController {
    constructor() {
        super();
        this.before((error, request, response) => {
            // :thinking: was going to circuit break here on something... but perhaps not. All we need is auth in this case I suppose.
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse<StripeCheckoutSessionResponse>) {
        const session = useSession();

        const userEmail = session.data?.user?.email;
        if (userEmail === null) {
            throw new Error("Email not found!");
        }

        const account = await this.db.account.findUnique({
            where: { email: userEmail },
        });

        const stripeCustomerId = account?.stripe_customer_id;
        if (stripeCustomerId === null) throw new Error("Stripe Customer ID not found!");

        // TODO: Hard coding the test stripe price product here for the moment. This exists now in the test stripe account
        try {
            const checkoutSession = await stripeBackendClient.checkout.sessions.create({
                line_items: [{ price: "price_1MhnobBuP1CjbxCnFeWwttQN", quantity: 1 }],
                cancel_url,
                success_url,
                mode: "payment",
                payment_method_types: ["card"],
            });
            return res.json({ session: checkoutSession });
        } catch (err) {
            console.log("Error attempting to create a checkout session. No charge was made.");
            return;
        }
    }
}

export type StripeCheckoutSessionRequest = {};

export type StripeCheckoutSessionResponse = {
    session: Stripe.Checkout.Session;
};

export default StripeCheckoutSessionController;
