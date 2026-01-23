import type { MetadataRoute } from "next";

import { SIZES } from "./icon1";

const manifest = (): MetadataRoute.Manifest => ({
  short_name: "Jeremy Nguyen",
  name: "Jeremy Nguyen",
  icons: [
    {
      src: "/icon.svg",
      type: "image/svg+xml",
      sizes: "any",
    },
    ...Object.entries(SIZES).map(([id, { width, height }]) => ({
      src: `/icon1/${id}`,
      type: "image/png",
      sizes: `${width}x${height}`,
    })),
  ],
  background_color: "white",
  display: "standalone",
  theme_color: "oklch(54.615% 0.16326 261.07)",
  description: "Jeremy Nguyen",
});

export default manifest;
