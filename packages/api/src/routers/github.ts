import { z } from "zod";

import {
  Repository,
  UserPinnedItemsTotalCountRequestParams,
} from "../schemas/github/pinnedItems";
import {
  SocialAccount,
  UserSocialAccountsTotalCountRequestParams,
} from "../schemas/github/socialAccounts";
import {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
} from "../services/github";
import { baseProcedure, createTRPCRouter } from "../trpc";

const githubRouter = createTRPCRouter({
  getPinnedItems: baseProcedure
    .input(UserPinnedItemsTotalCountRequestParams)
    .output(z.array(Repository))
    .query(async (opts) => {
      const { totalCount } = (await getPinnedItemsTotalCount(opts.input)).user
        .pinnedItems;

      if (totalCount === 0) {
        return [];
      }

      return (
        await getPinnedItemsNodes({
          ...opts.input,
          first: totalCount,
        })
      ).user.pinnedItems.nodes;
    }),
  getSocialAccounts: baseProcedure
    .input(UserSocialAccountsTotalCountRequestParams)
    .output(z.array(SocialAccount))
    .query(async (opts) => {
      const { totalCount } = (await getSocialAccountsTotalCount(opts.input))
        .user.socialAccounts;

      if (totalCount === 0) {
        return [];
      }

      return (
        await getSocialAccountsNodes({
          ...opts.input,
          first: totalCount,
        })
      ).user.socialAccounts.nodes;
    }),
});

export { githubRouter };
