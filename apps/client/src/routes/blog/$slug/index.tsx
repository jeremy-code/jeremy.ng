import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import { Comments } from "#components/blog/Comments";
import { SsrDate } from "#components/common/SsrDate";
import { getBlogPost } from "#functions/getBlogPost";
import { env } from "#utils/env";
import { seo } from "#utils/seo";
import { Badge } from "@jeremyng/ui/components/Badge";
import {
  Breadcrumb,
  BreadcrumbCurrentLink,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@jeremyng/ui/components/Breadcrumb";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";
import { Separator } from "@jeremyng/ui/components/Separator";
import { GitHub } from "@jeremyng/ui/icons/GitHub";

const listFormatter = new Intl.ListFormat("en", { style: "long" });

const BlogPostComponent = () => {
  const { RenderableMarkdown, metadata, dehydratedState } =
    Route.useLoaderData();

  const publishedDateInstant =
    metadata.publishedDate !== undefined ?
      Temporal.Instant.fromEpochMilliseconds(Date.parse(metadata.publishedDate))
    : undefined;

  return (
    <main className="py-8">
      <Breadcrumb className="container mb-4 max-w-prose">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<RouterLink to="/blog">Blog</RouterLink>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbCurrentLink>{metadata.title}</BreadcrumbCurrentLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article className="container flex max-w-prose flex-col gap-4">
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
            href={`https://github.com/${env.VITE_GITHUB_USERNAME}/jeremy.ng/blob/${env.WORKERS_CI_BRANCH}/apps/client/blog/${metadata.slug}.md`}
            className={buttonVariants({ color: "gray" })}
          >
            <GitHub className="size-4" />
            View on GitHub
          </a>
        </div>

        {RenderableMarkdown}
      </article>
      <div
        role="group"
        className="container mt-8 grid max-w-prose items-stretch gap-2 sm:grid-cols-2"
      >
        {metadata.previousPost !== undefined && (
          <RouterLink
            className={buttonVariants({
              className:
                "h-auto flex-col items-start gap-0 py-3 sm:col-start-1",
              color: "gray",
              variant: "outline",
            })}
            to="/blog/$slug"
            params={{ slug: metadata.previousPost.slug }}
          >
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="text-base font-medium">
              {metadata.previousPost.title}
            </span>
          </RouterLink>
        )}
        {metadata.nextPost !== undefined && (
          <RouterLink
            className={buttonVariants({
              className: "h-auto flex-col items-end gap-0 py-3 sm:col-start-2",
              color: "gray",
              variant: "outline",
            })}
            to="/blog/$slug"
            params={{ slug: metadata.nextPost.slug }}
          >
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-base font-medium">
              {metadata.nextPost.title}
            </span>
          </RouterLink>
        )}
      </div>
      <HydrationBoundary state={dehydratedState}>
        <div className="container flex max-w-prose flex-col gap-4 pt-8">
          <Separator />
          <Heading id="comments" as="h2" size="xl" className="mb-2">
            <Link variant="anchor" href="#comments">
              Comments
            </Link>
          </Heading>
          {metadata.mastodonId !== undefined ?
            <Comments mastodonId={metadata.mastodonId} />
          : "It looks like there isn't a Mastodon ID for this post, sorry."}
        </div>
      </HydrationBoundary>
    </main>
  );
};

const Route = createFileRoute("/blog/$slug/")({
  component: BlogPostComponent,
  loader: async ({ context, params }) => {
    const { RenderableMarkdown, metadata } = await getBlogPost({
      data: params.slug,
    });

    if (metadata.mastodonId !== undefined) {
      await context.queryClient.prefetchQuery(
        context.trpc.mastodon.getStatus.queryOptions({
          statusId: metadata.mastodonId,
        }),
      );
    }

    return {
      RenderableMarkdown,
      metadata,
      dehydratedState: dehydrate(context.queryClient),
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
            image: {
              url: `${env.VITE_BASE_URL}/blog/${loaderData.metadata.slug}/og-image.jpg`,
              type: "image/jpeg",
              width: 1200,
              height: 600,
              alt: loaderData.metadata.title,
            },
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
