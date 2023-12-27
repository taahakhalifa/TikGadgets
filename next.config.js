/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                protocol: "http",
            },
            {
                hostname: "https://dainty-donut-9a7c45.netlify.app",
                protocol: "https",
            },
        ],
    },
};

module.exports = nextConfig;
