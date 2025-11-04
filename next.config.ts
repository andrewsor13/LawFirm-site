import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kdpghvehafpwfgoxkvng.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
