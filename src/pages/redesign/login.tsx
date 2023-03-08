import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { getProviders } from 'next-auth/react';
import { CommonProviderOptions } from 'next-auth/providers';
import { AuthLayout } from '@/components/redesign/AuthLayout';
import { Providers } from '@/components/redesign/Providers';

const Home = ({ providers = [] }: { providers: CommonProviderOptions[] }) => {
  return (
    <>
      <Head>
        <title>Sign In - Big Goose</title>
      </Head>
      <AuthLayout>
        <div className='flex flex-col'>
          <Link href='/' aria-label='Home'>
              Logo here
          </Link>
          <div className='mt-20'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-sm text-gray-700'>
              Don&apos;t have an account? Sign in below to start a free trial.
            </p>
          </div>
        </div>
        <div className='pt-10'>
          <Providers providers={providers}/>
        </div>
      </AuthLayout>
    </>
  );
};

export async function getServerSideProps (): Promise<{ props: { providers: any } }> {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};

export default Home;
