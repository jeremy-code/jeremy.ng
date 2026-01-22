import { z } from "zod";

const LanguageSchema = z.object({
  color: z.string().optional(),
  id: z.string(),
  name: z.string(),
});

const LicenseSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  spdxId: z.string().optional(),
  url: z.string().optional(),
});

const UserQueryParams = z.object({
  login: z.string(),
});

const PinnedItemsQueryParams = UserQueryParams.extend({
  types: z
    .enum([
      "REPOSITORY",
      "GIST",
      "ISSUE",
      "PROJECT",
      "PULL_REQUEST",
      "USER",
      "ORGANIZATION",
      "TEAM",
    ])
    .nullable()
    .default(null),
  after: z.string().nullable().default(null),
  before: z.string().nullable().default(null),
  first: z.number().nullable().default(null),
  last: z.number().nullable().default(null),
});

const RepositorySchema = z.object({
  createdAt: z.iso.datetime(),
  description: z.string().optional(),
  homepageUrl: z.string().optional(),
  id: z.string(),
  licenseInfo: LicenseSchema.optional(),
  name: z.string(),
  nameWithOwner: z.string(),
  primaryLanguage: LanguageSchema.optional(),
  pushedAt: z.iso.datetime().optional(),
  stargazerCount: z.number(),
  updatedAt: z.iso.datetime(),
  url: z.url(),
});

type RepositorySchema = z.infer<typeof RepositorySchema>;

const PinnedItemsTotalCountSchema = z.object({
  user: z.object({
    pinnedItems: z.object({
      totalCount: z.number(),
    }),
  }),
});

type PinnedItemsTotalCountSchema = z.infer<typeof PinnedItemsTotalCountSchema>;

const PinnedItemsNodesSchema = z.object({
  user: z.object({
    pinnedItems: z.object({
      nodes: z.array(RepositorySchema),
    }),
  }),
});

type PinnedItemsNodesSchema = z.infer<typeof PinnedItemsNodesSchema>;

export {
  UserQueryParams,
  PinnedItemsQueryParams,
  RepositorySchema,
  PinnedItemsTotalCountSchema,
  PinnedItemsNodesSchema,
};
