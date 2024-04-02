import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = mdx({ options: { remarkPlugins: [remarkGfm] } });

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  logging: { fetches: { fullUrl: true } },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["@/components/ui"],
    webpackBuildWorker: true,
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
