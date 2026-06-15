import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
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

    return { metadata: post };
  });

export { getBlogPost };
