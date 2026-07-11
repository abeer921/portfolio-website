import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  async rewrites() {
    if (isVercel) return [];

    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5100/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5100/uploads/:path*",
      },
      {
        source: "/health",
        destination: "http://localhost:5100/health",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5100",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
