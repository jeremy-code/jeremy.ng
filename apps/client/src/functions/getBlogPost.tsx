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
    const post = posts.find((candidate) => candidate.slug === data);

    if (!post) {
      throw notFound();
    }
    const { content, ...metadata } = post;

    const RenderableMarkdown = await renderServerComponent(
      <Markdown>{post.content}</Markdown>,
    );

    return {
      RenderableMarkdown,
      metadata,
    };
  });

export { getBlogPost };
