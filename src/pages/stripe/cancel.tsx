import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Success() {
    const router = useRouter();

    const onClick = () => {
        router.push("/");
    };

    return (
        <Layout pageName="Stripe Session Cancelled">
            <div className="m-12 p-12">
                <h1>You&apos;ve cancelled your transaction :D</h1>
                <p>You haven&apos;t paid anything. If you change your mind, head back to the Top up page.</p>
                <button onClick={onClick} />
            </div>
        </Layout>
    );
}
