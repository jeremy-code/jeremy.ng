import { exec } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";

import { defineCollection, defineConfig } from "@content-collections/core";
import * as z from "zod";

const execAsync = promisify(exec);

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
});

const posts = defineCollection({
  name: "posts",
  directory: "./blog",
  include: "*.md",
  parser: "frontmatter",
  schema: postSchema,
  transform: async (data, context) => {
    const publishedDate = await context.cache(
      data._meta.filePath,
      async (filePath) => {
        const { stdout } = await execAsync(
          `git log --max-count-oldest=1 --format=%at -- ${join(context.collection.directory, filePath)}`,
        );
        const unixTimestamp = parseInt(stdout);
        if (stdout !== "" && !Number.isNaN(unixTimestamp)) {
          return new Date(unixTimestamp * 1000).toISOString();
        }
        /**
         * TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type
         * string or an instance of Buffer, TypedArray, or DataView. Received
         * undefined
         */
        return "";
      },
    );

    return {
      ...data,
      publishedDate: publishedDate !== "" ? publishedDate : undefined,
      slug: data._meta.path,
    };
  },
});

const contentCollectionsConfig = defineConfig({
  content: [posts],
});

export default contentCollectionsConfig;
