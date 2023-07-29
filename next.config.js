/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  experimental: {
    nextScriptWorkers: true,
    serverActions: true,
  },
};
