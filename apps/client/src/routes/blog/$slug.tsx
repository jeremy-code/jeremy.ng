import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import { env } from "#config/env";
import { getBlogPost } from "#functions/getBlogPost";
import { seo } from "#utils/seo";
import { Badge } from "@jeremyng/ui/components/Badge";
import { Button } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Separator } from "@jeremyng/ui/components/Separator";
import { GitHub } from "@jeremyng/ui/icons/GitHub";

const listFormatter = new Intl.ListFormat("en", { style: "long" });

const BlogPostComponent = () => {
  const { metadata, Renderable } = Route.useLoaderData();

  const instant = Temporal.Instant.fromEpochMilliseconds(
    Date.parse(metadata.publishedDate),
  );

  return (
    <main>
      <article className="container flex max-w-prose flex-col gap-4 py-4">
        <header>
          <Heading as="h1" size="5xl">
            {metadata.title}
          </Heading>
          <p className="text-xl/loose">{metadata.lede}</p>
          <HorizontalList className="mt-2">
            <HorizontalListItem>
              {listFormatter.format(
                metadata.authors.map((author) => author.name),
              )}
            </HorizontalListItem>
            <HorizontalListItem>
              <time dateTime={instant.toString()}>
                <ClientOnly
                  fallback={instant
                    .toZonedDateTimeISO("UTC")
                    .toLocaleString(undefined, {
                      dateStyle: "long",
                    })}
                >
                  {instant.toLocaleString(undefined, {
                    dateStyle: "long",
                  })}
                </ClientOnly>
              </time>
            </HorizontalListItem>
          </HorizontalList>
          <div className="mt-4 flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Badge size="md" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {Renderable}

        <Separator />

        <div role="group">
          <Button color="default" asChild>
            <a
              href={`https://github.com/${env.VITE_GITHUB_USERNAME}/jeremy.ng/blob/main/apps/client/blog/${metadata.slug}.md`}
            >
              <GitHub className="size-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </article>
    </main>
  );
};

const Route = createFileRoute("/blog/$slug")({
  component: BlogPostComponent,
  loader: async ({ params }) => {
    return await getBlogPost({ data: params.slug });
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
    "CDN-Cache-Control": "max-age=7200",
  }),
});

export { Route };
