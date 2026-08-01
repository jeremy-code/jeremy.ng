import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";

import { allPosts, type Post } from "#content-collections";

const getBlogPost = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(({ data }: { data: string }): Post => {
    const post = allPosts.find((candidate) => candidate.slug === data);

    if (!post) {
      throw notFound();
    }

    return post;
  });

export { getBlogPost };
