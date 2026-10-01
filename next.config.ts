import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography: serve modern formats at a higher quality than Next's default 75.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
