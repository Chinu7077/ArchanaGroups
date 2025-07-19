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

  // ✅ Fix: Move redirects inside this object
  async redirects() {
    return [
      {
        // Redirect www → non-www
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.archanagroups.in",
          },
        ],
        destination: "https://archanagroups.in/:path*",
        permanent: true,
      },
      {
        // Redirect http → https (important for SEO and Google)
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://archanagroups.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
