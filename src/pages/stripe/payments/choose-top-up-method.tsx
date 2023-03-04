import { NormalButton } from "@/components/buttons/NormalButton";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function ChooseTopUpMethod() {
    const router = useRouter();

    const onClick = () => {
        router.push("/stripe/payments/manual-top-up");
    };

    return (
        <Layout pageName="Choose Topup Method">
            <div className="m-12 w-full flex flex-row justify-around">
                <NormalButton onClick={onClick}>Manual Top up</NormalButton>
                <NormalButton disabled={true}>Enable Auto-top up</NormalButton>
            </div>
        </Layout>
    );
}
