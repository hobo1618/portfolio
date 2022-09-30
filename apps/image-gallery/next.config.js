const withTM = require("next-transpile-modules")(["ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dummyimage.com", "settla.s3.eu-central-1.amazonaws.com"],
  },
};

module.exports = withTM(nextConfig);
