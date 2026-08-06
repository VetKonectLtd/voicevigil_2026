import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "voicevigil.vetkonect.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Change to 5000 if your backend runs on port 5000
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
