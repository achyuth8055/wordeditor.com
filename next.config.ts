import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable strict mode
  reactStrictMode: false,
  eslint: {
    /**
     * https://nextjs.org/docs/app/api-reference/config/next-config-js/eslint
     * Ignore eslint errors during build
     *
     * https://github.com/vercel/next.js/discussions/59347
     */
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },
};

export default nextConfig;
