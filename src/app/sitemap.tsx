import { MetadataRoute } from "next";

const Sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://jeremy.ng",
      lastModified: new Date(),
    },
  ];
};

export default Sitemap;
