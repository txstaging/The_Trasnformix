import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    /* 90 keeps the small type in the القطاعات dashboard renders crisp. */
    qualities: [75, 90],
  },
};

export default nextConfig;
