import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function ChooseTopUpMethod() {
    const router = useRouter();

    const onClick = () => {};

    return (
        <Layout pageName="Manual Top Up">
            <button onClick={onClick}>Manual Top up</button>
            <button disabled={true}>Enable Auto-top up</button>
        </Layout>
    );
}
