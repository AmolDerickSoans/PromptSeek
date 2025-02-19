import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // Optional: You can customize the SVGR options here
          },
        },
      ],
    });
    return config;
  },
  /* config options here */
};

export default nextConfig;
