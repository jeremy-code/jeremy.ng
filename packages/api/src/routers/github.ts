import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Bio } from "../schemas/github/bio";
import { Repository } from "../schemas/github/pinnedItems";
import { SocialAccount } from "../schemas/github/socialAccounts";
import {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
  getBio,
} from "../services/github";
import { baseProcedure, createTRPCRouter } from "../trpc";

const githubRouter = createTRPCRouter({
  getPinnedItems: baseProcedure
    .input(z.strictObject({ login: z.string() }))
    .output(z.array(Repository))
    .query(async (opts) => {
      const totalCountResponse = await getPinnedItemsTotalCount(opts.input);

      if (totalCountResponse.user === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "The user could not be found when attempting to get the total count of pinned items.",
        });
      }

      const { totalCount } = totalCountResponse.user.pinnedItems;

      if (totalCount === 0) {
        return [];
      }

      const pinnedItemsNodesResponse = await getPinnedItemsNodes(opts.input);

      if (pinnedItemsNodesResponse.user === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "The user could not be found when attempting to get the pinned items.",
        });
      }

      return (
        pinnedItemsNodesResponse.user.pinnedItems.nodes?.filter(
          (node) => node !== null && node.__typename === "Repository",
        ) ?? []
      );
    }),
  getSocialAccounts: baseProcedure
    .input(z.strictObject({ login: z.string() }))
    .output(z.array(SocialAccount))
    .query(async (opts) => {
      const totalCountResponse = await getSocialAccountsTotalCount(opts.input);

      if (totalCountResponse.user === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "The user could not be found when attempting to get the total count of social accounts.",
        });
      }

      const { totalCount } = totalCountResponse.user.socialAccounts;

      if (totalCount === 0) {
        return [];
      }

      const socialAccountsNodesResponse = await getSocialAccountsNodes(
        opts.input,
      );

      if (socialAccountsNodesResponse.user === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "The user could not be found when attempting to get the social accounts.",
        });
      }

      return (
        socialAccountsNodesResponse.user.socialAccounts.nodes?.filter(
          (node) => node !== null,
        ) ?? []
      );
    }),
  getBio: baseProcedure
    .input(z.strictObject({ login: z.string() }))
    .output(Bio.nullable())
    .query(async (opts) => {
      const bioResponse = await getBio(opts.input);

      if (bioResponse.user === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "The user could not be found when attempting to get the bio.",
        });
      }

      return bioResponse.user.bio;
    }),
});

export { githubRouter };
