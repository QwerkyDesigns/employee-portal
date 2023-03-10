import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getProviders } from 'next-auth/react';
import { CommonProviderOptions } from 'next-auth/providers';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Providers } from '@/components/auth/Providers';

const Home = ({ providers = [] }: { providers: CommonProviderOptions[] }) => {
    return (
        <>
            <Head>
                <title>Sign In - Big Goose</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link href="/" aria-label="Home">
                        Home
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            No account?{' '}
                            <Link href="/register" className="font-medium text-blue-600 hover:underline">
                                Sign up
                            </Link>{' '}
                            for a free trial.
                        </p>
                    </div>
                </div>

                <div className="mb-12 pt-10">
                    <Providers providers={providers} />
                </div>
            </AuthLayout>
        </>
    );
};

export async function getServerSideProps(): Promise<{
    props: { providers: any };
}> {
    const providers = await getProviders();

    return {
        props: { providers }
    };
}

export default Home;
