import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import 'focus-visible';
import { Session } from 'next-auth';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Component {...pageProps} session={session} />
            </MantineProvider>
        </SessionProvider>
    );
}
