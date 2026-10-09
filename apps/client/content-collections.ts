import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";

import { defineCollection, defineConfig } from "@content-collections/core";
import * as yaml from "yaml";
import * as z from "zod";

const execFileAsync = promisify(execFile);

// https://git-scm.com/docs/pretty-formats
const GIT_FORMAT = `
- commit_hash: %H
  author:
    name: %an
    email: %ae
    date: %aI
  committer:
    name: %cn
    email: %ce
    date: %cI
  subject: >-
    %s
  message: >
    %w(0,0,4)%b%w(0,0,0)
`;

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

const gitUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  date: z.iso.datetime({ offset: true }),
});

const commitSchema = z.object({
  commit_hash: z.string(),
  author: gitUserSchema,
  committer: gitUserSchema,
  subject: z.string(),
  message: z.string(),
});

const posts = defineCollection({
  name: "posts",
  directory: "./blog",
  include: "*.md",
  parser: "frontmatter",
  schema: postSchema,
  transform: async (data, context) => {
    const rawCommits = await context.cache(
      data._meta.filePath,
      async (filePath) => {
        const { stdout } = await execFileAsync("git", [
          "log",
          `--format=${GIT_FORMAT}`,
          "--reverse",
          "--",
          join(context.collection.directory, filePath),
        ]);
        /**
         * TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type
         * string or an instance of Buffer, TypedArray, or DataView. Received
         * undefined
         */
        return stdout;
      },
    );
    const commits = z
      .array(commitSchema)
      .parse(yaml.parse(rawCommits))
      .map((commit) => ({
        ...commit,
        // Apparently, the commit date and the author date have no correlation
        // as to which comes first.
        // https://seasidetesting.com/2024/08/04/author-and-committer-dates-in-git-an-obscure-bug/
        // https://some-natalie.dev/blog/git-time/
        date:
          Date.parse(commit.author.date) > Date.parse(commit.committer.date)
            ? commit.author.date
            : commit.committer.date,
      }));

    return {
      ...data,
      // Sorted in reverse chronological order, so this is the first commit
      publishedDate: commits[0]?.date,
      commits,
      slug: data._meta.path,
    };
  },
});

const contentCollectionsConfig = defineConfig({
  content: [posts],
});

export default contentCollectionsConfig;
