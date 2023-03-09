import React from 'react';
import { Button } from '@/components/buttons/Button';
import { signIn } from 'next-auth/react';
import { DiGithubBadge } from 'react-icons/di';
import { CommonProviderOptions } from 'next-auth/providers';

function handleSignin(provider: CommonProviderOptions) {
  return () => {
    signIn(provider.id, {
      callbackUrl: `${window.location.origin}/portal`,
    });
  };
}

function GithubProvider({ provider }: { provider: CommonProviderOptions }) {
  return (
    <div key={provider.name}>
      <Button
        variant="solid"
        color="blue"
        className="w-full"
        onClick={handleSignin(provider)}
      >
        <span>
          <DiGithubBadge className="-mt-1 inline" size={'2rem'} /> Sign in with{' '}
          {provider.name} <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>
    </div>
  );
}

export function Providers({
  providers = [],
}: {
  providers: CommonProviderOptions[];
}) {
  return (
    <>
      {Object.values(providers).map((provider) => {
        if (provider.id === 'github') {
          return <GithubProvider key={provider.id} provider={provider} />;
        }

        return null;
      })}
    </>
  );
}
