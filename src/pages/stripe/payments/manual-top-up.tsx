import { NormalButton } from "@/components/buttons/NormalButton";
import Layout from "@/components/Layout";
import frontendClient from "@/lib/client/frontendClient";
import stripeFrontend from "@/lib/client/stripeFrontend";
import {
    StripeCheckoutSessionRequest,
    StripeCheckoutSessionResponse,
} from "@/lib/controllers/stripe/StripeCheckoutSessionController";

export default function ChooseTopUpMethod() {
    const onClick = async () => {
        const response = await frontendClient.post<StripeCheckoutSessionRequest, StripeCheckoutSessionResponse>(
            "stripe/create-checkout-session"
        );
        console.log(response);
        const sessionId = response.session.id;

        const stripeClientJs = await stripeFrontend;
        await stripeClientJs?.redirectToCheckout({ sessionId });
    };

    return (
        <Layout pageName="Manual Top Up">
            <p>Lets put somme useful information on this page for customers to consider before we send them to stripe</p>
            <p>
                We can also provide a custom checkout page design that also presents this info but maybe more concisely. Have a
                think about it :D
            </p>
            <NormalButton onClick={onClick}>Manual Top up</NormalButton>
        </Layout>
    );
}
