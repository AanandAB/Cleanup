import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no sharp — serve images unoptimized.
    // (Cloudflare Images / a custom loader can be wired later if needed.)
    unoptimized: true,
  },
};

// Makes local D1/R2 bindings work in `next dev` via miniflare.
void initOpenNextCloudflareForDev();

export default nextConfig;
