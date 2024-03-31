import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "Jeremy Nguyen",
  short_name: "Jeremy Nguyen's Site",
  description: "Jeremy Nguyen's personal site",
  start_url: "/",
  display: "standalone",
  background_color: "#fff",
  theme_color: "#fff",
  icons: [
    {
      src: "/favicon.ico",
      sizes: "any",
      type: "image/x-icon",
    },
  ],
});

export default manifest;
