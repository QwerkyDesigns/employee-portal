import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import stripeFrontend from "@/lib/client/stripeFrontend";
import {
    StripeCheckoutSessionRequest,
    StripeCheckoutSessionResponse,
} from "@/lib/controllers/stripe/StripeCheckoutSessionController";
import { useEffect } from "react";
import Landing from "../landing/pages/Landing"


export default function Home() {
    useEffect(() => {
        (async () => {
            const response = await frontendClient.post<StripeCheckoutSessionRequest, StripeCheckoutSessionResponse>(
                "stripe/create-checkout-session"
            );
            console.log(response);
            const sessionId = response.session.id;

            const stripeClientJs = await stripeFrontend;
            await stripeClientJs?.redirectToCheckout({ sessionId });
        })();
    });

    return (
        <Layout pageName="Qwerky Designs Employee Portal">
            <Landing />
        </Layout>
    );
}
