import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is disabled by default when not using --turbopack flag
  // This config was previously trying to disable it but the option doesn't exist

  // Optimize for development
  reactStrictMode: true,

  // Reduce memory usage
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
