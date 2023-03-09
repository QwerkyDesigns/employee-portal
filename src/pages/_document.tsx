import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: any) {
  let pageProps = props.__NEXT_DATA__?.props?.pageProps;

  return (
    <Html lang="en" className="h-full bg-gray-100">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
        />
      </Head>{' '}
      <body className="flex h-full flex-col">
        {/* <body className="h-full"> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
