import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getProviders } from 'next-auth/react'
import { CommonProviderOptions } from 'next-auth/providers'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Providers } from '@/components/auth/Providers'
import { TextField } from '@/components/landing/Fields'
import { Button } from '@/components/buttons/Button'
import { env } from '@/env/client.mjs'

const Home = ({ providers = [] }: { providers: CommonProviderOptions[] }) => {
  return (
    <>
      <Head>
        <title>Sign In - Big Goose</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            Logo here
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>

        {env.OPERATING_ENVIRONMENT !== 'prod' && (
          <div className="pt-10">
            <Providers providers={providers} />
          </div>
        )}

        <p className="mt-12 mb-12 text-center text-2xl font-extrabold">Or</p>
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps(): Promise<{
  props: { providers: any }
}> {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

export default Home
