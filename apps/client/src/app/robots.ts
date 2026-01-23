import type { MetadataRoute } from "next";

import { getBaseUrl } from "#utils/getBaseUrl";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
  },
  sitemap: `${getBaseUrl()}/sitemap.xml`,
});

export default robots;
