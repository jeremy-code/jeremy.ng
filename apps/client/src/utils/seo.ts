import type { ComponentPropsWithoutRef } from "react";

type SeoOptions = {
  title: string;
  description?: string;
  keywords?: string[];
  // https://ogp.me/#structured
  image?: {
    url: string;
    type?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  noindex?: boolean;
};

const seo = ({
  title,
  description,
  keywords,
  image,
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
    ...(image !== undefined ?
      [
        { property: "og:image", content: image.url },
        { name: "twitter:image", content: image.url },
        { name: "twitter:card", content: "summary_large_image" },
        ...[
          { name: "twitter:image:type", content: image.type },
          { property: "og:image:type", content: image.type },
          { name: "twitter:image:width", content: image.width?.toString() },
          { property: "og:image:width", content: image.width?.toString() },
          { name: "twitter:image:height", content: image.height?.toString() },
          { property: "og:image:height", content: image.height?.toString() },
          { name: "twitter:image:alt", content: image.alt },
          { property: "og:image:alt", content: image.alt },
        ].filter((tag) => tag.content !== undefined),
      ]
    : []),
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];

  return tags;
};

export { seo };
