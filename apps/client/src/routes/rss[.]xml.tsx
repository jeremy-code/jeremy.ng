import { createFileRoute } from "@tanstack/react-router";
import { generateRssFeed } from "feedsmith";
import type { Rss } from "feedsmith/types";
import { Marked } from "marked";

import { getBlogPosts } from "#functions/getBlogPosts";
import { env } from "#utils/env";
import uiCss from "@jeremyng/ui/globals.css?url";

const textEncoder = new TextEncoder();

const marked = new Marked({
  async: true,
  gfm: true,
});

const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      async GET() {
        const posts = await getBlogPosts();

        const rssItems = (await Promise.all(
          posts.map(async (post) => ({
            title: post.title,
            link: `${env.VITE_BASE_URL}/blog/${post.slug}`,
            description: post.lede,
            authors: post.authors.map((author) => author.name),
            categories: post.tags.map((tag) => ({ name: tag })),
            pubDate:
              post.publishedDate !== undefined ?
                new Date(post.publishedDate)
              : undefined,
            content: {
              encoded: await marked.parse(post.content),
            },
          })),
        )) satisfies Rss.Item<Date, Rss.Person>[];

        const rssFeed = generateRssFeed(
          {
            title: "Jeremy Nguyen",
            link: env.VITE_BASE_URL,
            description: "Personal website for Jeremy Nguyen",
            language: "en-US",
            pubDate: new Date(),
            categories: Array.from(
              new Set(posts.map((post) => post.tags).flat()),
            ).map((category) => ({ name: category })),
            items: rssItems,
          },
          {
            stylesheets: [
              {
                type: "text/css",
                href: uiCss,
                alternate: false,
              },
            ],
          },
        );

        const encodedRssFeed = textEncoder.encode(rssFeed);

        const sha256Hash = new Uint8Array(
          await crypto.subtle.digest("SHA-256", encodedRssFeed),
        ).toHex();

        return new Response(encodedRssFeed, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "CDN-Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            ETag: `"${sha256Hash}"`,
          },
        });
      },
    },
  },
});

export { Route };
