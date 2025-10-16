import type { NextConfig } from 'next';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // 개발 환경에서는 비활성화
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'peek-images-bucket.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname); // 프로젝트 루트 기준
    return config;
  },
};

module.exports = withPWA(nextConfig);
export default nextConfig;
