import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getProviders, signOut, useSession } from 'next-auth/react';
import { CommonProviderOptions } from 'next-auth/providers';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Providers } from '@/components/auth/Providers';
import { Button } from '@/components/buttons/Button';
import Divider from '@/components/dividers/Divider';

const Home = ({ providers = [] }: { providers: CommonProviderOptions[] }) => {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Sign In - Big Goose</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            No account?{' '}
                            Create one automatically when you sign in!
                        </p>
                    </div>
                </div>

                <div className="mb-12 pt-10">
                    <Providers providers={providers} />
                </div>
                {session && (
                    <>
                        <Divider text="or" />
                        <Button onClick={async () => signOut({ callbackUrl: `${window.location.origin}/` })} aria-label="Home">
                            {session ? 'Log out' : 'Home'}
                        </Button>
                    </>
                )}
            </AuthLayout>
        </>
    );
};

export async function getServerSideProps(): Promise<{
    props: { providers: any };
}> {
    return {
        props: { providers: await getProviders() }
    };
}

export default Home;
