/**
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return config;
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
    pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
    swcMinify: true,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en'
    },
    distDir: 'studio_build',
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
