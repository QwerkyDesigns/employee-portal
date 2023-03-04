import stripe from "@/lib/client/stripe";
import { useSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getBody } from "nextjs-backend-helpers";
import Stripe from "stripe";
import { AuthenticatedBaseController } from "../base/AuthenticatedBaseController";

class StripeCheckoutSessionController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.before((error, request, response) => {});
    }

    async post(req: NextApiRequest, res: NextApiResponse<StripeCheckoutSessionControllerResponse>) {
        const { success_url, cancel_url, productId } = getBody<StripeCheckoutSessionRequest>(req);
        const session = useSession();

        const userEmail = session.data?.user?.email;
        if (userEmail === null) {
            throw new Error("Email not found!");
        }

        const account = await this.db.account.findUnique({
            where: { email: userEmail },
        });

        const stripeCustomerId = account?.stripeCustomerId;
        if (stripeCustomerId === null) throw new Error("Stripe Customer ID not found!");

        // TODO: Hard coding the test stripe price product here for the moment
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [{ price: "price_1MhnobBuP1CjbxCnFeWwttQN", quantity: 1 }],
            cancel_url,
            success_url,
            mode: "payment",
        });

        return res.json({ session: checkoutSession });
    }
}

export type StripeCheckoutSessionRequest = {
    success_url: string;
    cancel_url: string;
    productId: string;
};

export type StripeCheckoutSessionControllerResponse = {
    session: Stripe.Checkout.Session;
};

export default StripeCheckoutSessionController;
