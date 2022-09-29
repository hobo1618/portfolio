const withTM = require("next-transpile-modules")(["ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dummyimage.com"],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withTM(nextConfig);
