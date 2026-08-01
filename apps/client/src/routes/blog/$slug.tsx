import { createFileRoute } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import { SsrDate } from "#components/common/SsrDate";
import { getBlogPost } from "#functions/getBlogPost";
import { env } from "#utils/env";
import { seo } from "#utils/seo";
import { Badge } from "@jeremyng/ui/components/Badge";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Separator } from "@jeremyng/ui/components/Separator";
import { GitHub } from "@jeremyng/ui/icons/GitHub";

const listFormatter = new Intl.ListFormat("en", { style: "long" });

const BlogPostComponent = () => {
  const { RenderableMarkdown, metadata } = Route.useLoaderData();

  const publishedDateInstant =
    metadata.publishedDate !== undefined ?
      Temporal.Instant.fromEpochMilliseconds(Date.parse(metadata.publishedDate))
    : undefined;

  return (
    <main>
      <article className="container flex max-w-prose flex-col gap-4 py-4">
        <header className="flex flex-col gap-4">
          <Heading as="h1" size="4xl" className="leading-tight">
            {metadata.title}
          </Heading>
          <p className="text-md/loose">{metadata.lede}</p>
          <HorizontalList>
            <HorizontalListItem>
              {"By "}
              {listFormatter.format(
                metadata.authors.map((author) => author.name),
              )}
            </HorizontalListItem>
            {publishedDateInstant !== undefined ?
              <HorizontalListItem>
                <time dateTime={publishedDateInstant.toString()}>
                  <SsrDate
                    dateTime={publishedDateInstant}
                    options={{ dateStyle: "long" }}
                  />
                </time>
              </HorizontalListItem>
            : null}
          </HorizontalList>
          <div className="flex flex-wrap gap-2" role="group">
            {metadata.tags.map((tag) => (
              <Badge size="md" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <Separator />

        <div role="group">
          <a
            href={`https://github.com/${env.VITE_GITHUB_USERNAME}/jeremy.ng/blob/main/apps/client/blog/${metadata.slug}.md`}
            className={buttonVariants({ color: "gray" })}
          >
            <GitHub className="size-4" />
            View on GitHub
          </a>
        </div>

        {RenderableMarkdown}
      </article>
    </main>
  );
};

const Route = createFileRoute("/blog/$slug")({
  component: BlogPostComponent,
  loader: async ({ params }) => {
    const { RenderableMarkdown, metadata } = await getBlogPost({
      data: params.slug,
    });

    return {
      RenderableMarkdown,
      metadata,
    };
  },
  head: ({ loaderData }) =>
    loaderData ?
      {
        meta: {
          ...seo({
            title: loaderData.metadata.title,
            description: loaderData.metadata.lede,
            keywords: loaderData.metadata.tags,
          }),
        },
        scripts: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@id": `${env.VITE_BASE_URL}/blog/${loaderData.metadata.slug}#article`,
                  "@type": "BlogPosting",
                  datePublished: loaderData.metadata.publishedDate,
                  dateModified: loaderData.metadata.publishedDate,
                  inLanguage: "en-US",
                  headline: loaderData.metadata.title,
                  abstract: loaderData.metadata.lede,
                  description: loaderData.metadata.lede,
                  author: {
                    "@id": `${env.VITE_BASE_URL}/#person`,
                  },
                  keywords: loaderData.metadata.tags.join(","),
                  url: `${env.VITE_BASE_URL}/blog/${loaderData.metadata.slug}`,
                  isPartOf: {
                    "@id": `${env.VITE_BASE_URL}/blog#blog`,
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${env.VITE_BASE_URL}/blog/${loaderData.metadata.slug}`,
                  },
                },
              ],
            }),
          },
        ],
      }
    : {},
  headers: () => ({
    "Cache-Control": "public, max-age=3600",
    "CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=3600",
  }),
});

export { Route };
