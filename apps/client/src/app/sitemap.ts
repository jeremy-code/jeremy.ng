import type { MetadataRoute } from "next";

import { getBaseUrl } from "#utils/getBaseUrl";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: getBaseUrl(), lastModified: new Date() },
];

export default sitemap;
