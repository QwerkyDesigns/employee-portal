import React from 'react';
import { Button } from '@/components/buttons/Button';
import { signIn } from 'next-auth/react';
import { DiGithubBadge } from 'react-icons/di';
import { CommonProviderOptions } from 'next-auth/providers';
import { env } from '@/env/client.mjs';
import { TextField } from '@/components/landing/Fields';
import Divider from '../dividers/Divider';

function handleSignin(provider: CommonProviderOptions) {
    return () => {
        signIn(provider.id, {
            callbackUrl: `${window.location.origin}/portal`
        });
    };
}

function GithubProvider({ provider }: { provider: CommonProviderOptions }) {
    return (
        <div className="mb-12" key={provider.name}>
            <Button variant="solid" color="blue" className="w-full" onClick={handleSignin(provider)}>
                <span>
                    <DiGithubBadge className="-mt-1 inline" size={'2rem'} /> Sign in with {provider.name} <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>
    );
}

function CredentialsProvider({ provider }: { provider: CommonProviderOptions }) {
    return (
        <div>
            <p className="font-extrabold">Sign with {provider.name} </p>
            <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
                <TextField label="Email address" id="usernameoremail" name="usernameoremail" type="text" autoComplete="email" required />
                <TextField label="Password" id="password" name="password" type="password" autoComplete="current-password" required />
                <div className="mb-12">
                    <Button type="submit" variant="solid" color="blue" className="w-full">
                        <span>
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
            <Divider text="Or" classNames="mb-12" />
        </div>
    );
}

export function Providers({ providers = [] }: { providers: CommonProviderOptions[] }) {
    return (
        <>
            {Object.values(providers).map((provider) => {
                if (provider.id === 'github' && env.NEXT_PUBLIC_OPERATING_ENVIRONMENT !== 'prod') {
                    return <GithubProvider key={provider.id} provider={provider} />;
                }
                if (provider.id === 'credentials') {
                    return <CredentialsProvider key={provider.id} provider={provider} />;
                }

                return null;
            })}
        </>
    );
}
