import type { ComponentPropsWithoutRef } from "react";

type SeoOptions = {
  title: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
};

const seo = ({
  title,
  description,
  keywords,
  noindex,
}: SeoOptions): ComponentPropsWithoutRef<"meta">[] => {
  const tags = [
    { title },
    { name: "apple-mobile-web-app-title", content: title },
    { name: "description", content: description },
    ...(keywords !== undefined ?
      [{ name: "keywords", content: keywords.join(",") }]
    : []),
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];

  return tags;
};

export { seo };
