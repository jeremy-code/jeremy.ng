import { defineCollection, defineConfig } from "@content-collections/core";
import * as z from "zod";

const postSchema = z.strictObject({
  title: z.string().min(1),
  authors: z.array(
    z.strictObject({
      name: z.string(),
    }),
  ),
  lede: z.string().min(1),
  content: z.string(),
  tags: z.array(z.string().min(1)),
  // Always treat Mastodon IDs as opaque strings
  // https://docs.joinmastodon.org/api/guidelines/#id
  mastodonId: z.string().optional(),
  publishedDate: z.iso.datetime(),
});

const posts = defineCollection({
  name: "posts",
  directory: "./blog",
  include: "*.md",
  parser: "frontmatter",
  schema: postSchema,
  transform: async (data) => {
    return {
      ...data,
      slug: data._meta.path,
    };
  },
});

const contentCollectionsConfig = defineConfig({
  content: [posts],
});

export default contentCollectionsConfig;
