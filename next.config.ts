import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/auth/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
