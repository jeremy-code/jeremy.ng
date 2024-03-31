import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://jeremy.ng",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
];

export default sitemap;
