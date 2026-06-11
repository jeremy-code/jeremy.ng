import { z } from "zod";

const Language = z.strictObject({
  color: z.string().optional(),
  id: z.string(),
  name: z.string(),
});
type Language = z.infer<typeof Language>;

const License = z.strictObject({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  spdxId: z.string().optional(),
  url: z.url().optional(),
});
type License = z.infer<typeof License>;

const Repository = z.strictObject({
  createdAt: z.iso.datetime(),
  id: z.string(),
  name: z.string(),
  nameWithOwner: z.string(),
  stargazerCount: z.int32(),
  updatedAt: z.iso.datetime(),
  url: z.url(),
  description: z.string().optional(),
  homepageUrl: z.string().optional(),
  licenseInfo: License.optional(),
  primaryLanguage: Language.optional(),
  pushedAt: z.iso.datetime().optional(),
});
type Repository = z.infer<typeof Repository>;

const UserPinnedItemsTotalCountRequestParams = z.strictObject({
  login: z.string(),
});

const UserPinnedItemsTotalCountResponse = z.strictObject({
  user: z.strictObject({
    pinnedItems: z.strictObject({
      totalCount: z.number(),
    }),
  }),
});
type UserPinnedItemsTotalCountResponse = z.infer<
  typeof UserPinnedItemsTotalCountResponse
>;

const UserPinnedItemsNodesRequestParams = z.strictObject({
  login: z.string(),
  first: z.int32().optional(),
});

const UserPinnedItemsNodesResponse = z.strictObject({
  user: z.strictObject({
    pinnedItems: z.strictObject({
      nodes: z.array(Repository),
    }),
  }),
});
type UserPinnedItemsNodesResponse = z.infer<
  typeof UserPinnedItemsNodesResponse
>;

export {
  Repository,
  Language,
  License,
  UserPinnedItemsTotalCountRequestParams,
  UserPinnedItemsTotalCountResponse,
  UserPinnedItemsNodesRequestParams,
  UserPinnedItemsNodesResponse,
};
