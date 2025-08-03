import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/auth/reset-password',
        destination: '/reset-password',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
