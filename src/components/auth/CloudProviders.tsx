import { Button } from '@/components/buttons/Button';
import { signIn } from 'next-auth/react';
import { DiGithubBadge, DiGoogleDrive } from 'react-icons/di';
import { CommonProviderOptions } from 'next-auth/providers';

function handleCloudAuthSignin(provider: CommonProviderOptions) {
    return async () => {
        await signIn(provider.id, {
            redirect: true,
            callbackUrl: `${window.location.origin}/portal`
        });
    };
}

export function GithubProvider({ provider }: { provider: CommonProviderOptions }) {
    return (
        <div className="mb-12" key={provider.name}>
            <Button variant="solid" color="blue" className="w-full" onClick={handleCloudAuthSignin(provider)}>
                <span>
                    <DiGithubBadge className="-mt-1 inline" size={'2rem'} /> Sign in with {provider.name} <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>
    );
}

export function GooogleProvider({ provider }: { provider: CommonProviderOptions }) {
    return (
        <div className="mb-12" key={provider.name}>
            <Button variant="solid" color="blue" className="w-full" onClick={handleCloudAuthSignin(provider)}>
                <span>
                    <DiGoogleDrive className="-mt-1 inline" size={'2rem'} /> Sign in with {provider.name} <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>
    );
}
