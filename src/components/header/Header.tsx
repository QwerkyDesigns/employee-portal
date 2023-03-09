import { Container } from '@mantine/core';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side

import { AuthenticatedHeader } from './AuthenticatedHeader';
import { UnAuthenticatedHeader } from './UnAuthenticatedHeader';

const fakeSession: Session = {
  user: {
    image: 'abc',
    email: 'paul.g@gmail.com',
    name: 'Paul The Destroyer',
  },
  expires: null!,
};

// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const children =
    status === 'authenticated' ? (
      <AuthenticatedHeader session={session} />
    ) : (
      <UnAuthenticatedHeader />
    );
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div
        className={`nojs-show block min-h-[4rem] w-full ${
          !session && loading
            ? '-top-2 opacity-0'
            : 'opacity-1 bg-success relative top-0 m-0 overflow-hidden border-r-2 p-2 ease-in'
        }`}
      >
        <Container fluid>{children}</Container>
      </div>
    </header>
  );
}
