import { createFileRoute, Link } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import { SsrDate } from "#components/common/SsrDate";
import { getBlogPosts } from "#functions/getBlogPosts";
import { env } from "#utils/env";
import { Badge } from "@jeremyng/ui/components/Badge";
import { cardVariants } from "@jeremyng/ui/components/Card";
import { Heading } from "@jeremyng/ui/components/Heading";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";

const listFormatter = new Intl.ListFormat("en", { style: "long" });

const BlogComponent = () => {
  const { posts } = Route.useLoaderData();

  return (
    <main className="container py-4">
      <Heading as="h1" size="4xl" className="mb-4 leading-tight">
        Blog
      </Heading>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => {
          const publishedDateInstant =
            post.publishedDate !== undefined ?
              Temporal.Instant.fromEpochMilliseconds(
                Date.parse(post.publishedDate),
              )
            : undefined;
          const { base, title, header, body, description } = cardVariants({
            size: "md",
          });

          return (
            <li key={post.slug}>
              <Link
                className={base()}
                to="/blog/$slug"
                params={{ slug: post.slug }}
              >
                <div className={header()}>
                  <h2 className={title({ className: "mb-1 text-2xl/tight" })}>
                    {post.title}
                  </h2>
                  <p className={description()}>{post.lede}</p>
                </div>
                <div className={body()}>
                  <HorizontalList className="mt-2">
                    <HorizontalListItem>
                      {listFormatter.format(
                        post.authors.map((author) => author.name),
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
                    <HorizontalListItem role="group">
                      {post.tags.map((tag) => (
                        <Badge size="md" key={tag}>
                          {tag}
                        </Badge>
                      ))}
                    </HorizontalListItem>
                  </HorizontalList>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

const Route = createFileRoute("/blog/")({
  component: BlogComponent,
  loader: async () => ({ posts: await getBlogPosts() }),
  head: ({ loaderData }) => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${env.VITE_BASE_URL}/blog#blog`,
              blogPost: loaderData?.posts.map((post) => ({
                "@id": `${env.VITE_BASE_URL}/blog/${post.slug}#article`,
              })),
              author: {
                "@id": `${env.VITE_BASE_URL}/#person`,
              },
              inLanguage: "en-US",
              isPartOf: {
                "@id": `${env.VITE_BASE_URL}/#website`,
              },
            },
          ],
        }),
      },
    ],
  }),
  headers: () => ({
    "Cache-Control": "public, max-age=3600",
    "CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=3600",
  }),
});

export { Route };
