/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'archanagroups.in' }],
        destination: 'https://archanagroups.in/:1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
