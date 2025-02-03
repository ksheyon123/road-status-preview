import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote",
        remotes: {
          component: "host@http://localhost:3000/remoteEntry.js",
          leaflet:
            "map@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {}, // 호스트 앱에서 노출할 것이 없더라도 빈 객체 필요
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: !isServer, // 이 부분 추가
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            eager: !isServer,
          },
        },
      })
    );
    return config;
  },
};

export default nextConfig;
