import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: false,
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**/**')],
  },
};

export default nextConfig;
