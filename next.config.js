/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "qd-uploads-and-transfers-dev.s3.amazonaws.com",
                port: "",
                pathname: "**/*",
            },
        ],
    },
};

module.exports = nextConfig;
