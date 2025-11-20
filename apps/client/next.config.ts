import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  poweredByHeader: false,
  compiler: {
    removeConsole: { exclude: ["error"] },
  },
  reactCompiler: true,
  experimental: {
    webpackBuildWorker: true,
  },
} satisfies NextConfig;

export default withBundleAnalyzer(nextConfig);
