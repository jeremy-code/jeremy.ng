import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import { env } from "#config/env";
import { getPublishedPosts } from "#utils/blog";
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
      <Heading as="h1" size="3xl" className="mb-4">
        Blog
      </Heading>
      <ul>
        {posts.map((post) => {
          const instant = Temporal.Instant.fromEpochMilliseconds(
            Date.parse(post.publishedDate),
          );
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
                  <h2 className={title({ className: "text-3xl/normal" })}>
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
                    <HorizontalListItem>
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
  loader: () => ({ posts: getPublishedPosts() }),
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
    "CDN-Cache-Control": "max-age=7200",
  }),
});

export { Route };
