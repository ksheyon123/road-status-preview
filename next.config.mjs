import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 60000,
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
