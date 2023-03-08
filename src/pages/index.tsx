import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import stripeFrontend from "@/lib/client/stripeFrontend";
import {
    StripeCheckoutSessionRequest,
    StripeCheckoutSessionResponse,
} from "@/lib/controllers/stripe/StripeCheckoutSessionController";
import { Title, Text } from "@mantine/core";
import { useEffect } from "react";

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
            <div style={{ marginTop: "4rem" }}>
                <Title align="center" style={{ marginBottom: "1rem" }}>
                    Welcome to the Qwerky Designs backend portal!
                </Title>
                <Text align="center">
                    You can use the navigation in the header to navigate to the page you need to do your work.
                </Text>
            </div>
        </Layout>
    );
}
