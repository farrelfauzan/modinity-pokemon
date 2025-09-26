import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.join(__dirname, "../"),
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
