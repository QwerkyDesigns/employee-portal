import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function ChooseTopUpMethod() {
    const router = useRouter();

    const onClick = () => {
        router.push("/payments/manual-top-up");
    };

    return (
        <Layout pageName="Choose Topup Method">
            <button onClick={onClick}>Manual Top up</button>
            <button disabled={true}>Enable Auto-top up</button>
        </Layout>
    );
}
