import { MetadataRoute } from "next";

const Robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jeremy.ng/sitemap.xml",
  };
};

export default Robots;
