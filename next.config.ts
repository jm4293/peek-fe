import type { NextConfig } from 'next';
import path from 'path';

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

export default nextConfig;
