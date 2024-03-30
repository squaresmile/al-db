// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    basePath: "/db",
    output: "export",
    experimental: {
        largePageDataBytes: 1024 * 1024 * 5,
    },
};

module.exports = nextConfig;
