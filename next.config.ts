import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force dynamic rendering for all pages that need it
  output: 'standalone',
};

export default nextConfig;