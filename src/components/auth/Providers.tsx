import { CommonProviderOptions } from 'next-auth/providers';
import { env } from '@/env/client.mjs';
import { GithubProvider, GooogleProvider } from './CloudProviders';
import { CredentialsProvider } from './CredentialsProvider';


export function Providers({ providers = [] }: { providers: CommonProviderOptions[] }) {
    return (
        <>
            {Object.values(providers).map((provider) => {
                if (provider.id === 'github' && env.NEXT_PUBLIC_IS_PROD === 'false') {
                    return <GithubProvider key={provider.id} provider={provider} />;
                }

                if (provider.id === 'google') {
                    return <GooogleProvider key={provider.id} provider={provider} />;
                }

                if (provider.id === 'credentials') {
                    return <CredentialsProvider key={provider.id} provider={provider} />;
                }

                return null;
            })}
        </>
    );
}
