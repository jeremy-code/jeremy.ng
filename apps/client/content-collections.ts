import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "./blog",
  include: "*.md",
  schema: z.strictObject({
    title: z.string().min(1),
    publishedDate: z.iso.datetime(),
    authors: z
      .strictObject({
        name: z.string(),
        uuid: z.uuidv4(),
      })
      .array(),
    isDraft: z.boolean().optional(),
    lede: z.string().min(1),
    content: z.string(),
    tags: z.string().min(1).array(),
  }),
  transform: (data, context) => {
    if (data.isDraft) {
      context.skip();
    }

    return { ...data, slug: data._meta.path };
  },
});

export default defineConfig({
  content: [posts],
});
