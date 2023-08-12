const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
});
