import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import Markdown from "markdown-to-jsx/react";
import { z } from "zod";

import { getPublishedPosts } from "#utils/blog";

const getBlogPost = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data }: { data: string }) => {
    const post = getPublishedPosts().find(
      (candidate) => candidate.slug === data,
    );

    if (!post) {
      throw notFound();
    }

    const Renderable = await renderServerComponent(
      <Markdown>{post.content}</Markdown>,
    );

    return { metadata: post, Renderable };
  });

export { getBlogPost };
