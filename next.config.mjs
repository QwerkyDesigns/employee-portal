import withMDX from '@next/mdx';

/**
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return config;
    // if (process.env.NODE_ENV === 'development') {
    //     return config;
    // }
    // return withMDX(config);
}

export default defineNextConfig({
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 500,
                aggregateTimeout: 300
            };
        }
        return config;
    },
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    swcMinify: true,
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
        locales: ['en'],
        defaultLocale: 'en'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qd-uploads-and-transfers-dev.s3.amazonaws.com',
                port: '',
                pathname: '**/*'
            }
        ]
    }
});
