import { MetadataRoute } from "next";

const Sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://jeremy.ng",
      lastModified: new Date(),
    },
    {
      url: "https://jeremy.ng/resume",
      lastModified: new Date(),
    },
  ];
};

export default Sitemap;
