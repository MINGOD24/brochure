import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for Strapi images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "vinnews.com",
      },
      {
        protocol: "https",
        hostname: "matzav.com",
      },
      {
        protocol: "https",
        hostname: "ventsmagazine.com",
      },
    ],
  },
  // Ensure proper headers for Strapi
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
