import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import * as z from "zod";

import { Markdown } from "#components/markdown/Markdown";

import { getBlogPosts } from "./getBlogPosts";

const getBlogPost = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data }: { data: string }) => {
    const posts = await getBlogPosts();
    const postIndex = posts.findIndex((candidate) => candidate.slug === data);
    const post = postIndex !== -1 ? posts[postIndex] : undefined;

    if (post === undefined) {
      throw notFound();
    }
    const { content, ...metadata } = post;

    const RenderableMarkdown = await renderServerComponent(
      <Markdown>{post.content}</Markdown>,
    );

    const nextPost = postIndex === 0 ? undefined : posts[postIndex - 1];
    const previousPost =
      postIndex === posts.length - 1 ? undefined : posts[postIndex + 1];

    return {
      RenderableMarkdown,
      metadata: {
        ...metadata,
        previousPost:
          previousPost !== undefined ?
            {
              // For now, only these fields are needed. This prevents an
              // unnecessary large payload since the post includes .content
              slug: previousPost.slug,
              title: previousPost.title,
            }
          : undefined,
        nextPost:
          nextPost !== undefined ?
            {
              slug: nextPost.slug,
              title: nextPost.title,
            }
          : undefined,
      },
    };
  });

export { getBlogPost };
