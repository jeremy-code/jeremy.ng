import { TRPCError } from "@trpc/server";
import { RequestError } from "octokit";
import * as z from "zod";

import { repositorySchema } from "../schemas/github/pinnedItems";
import { socialAccountSchema } from "../schemas/github/socialAccounts";
import { githubUserSchema } from "../schemas/github/user";
import {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
  getUser,
} from "../services/github";
import { baseProcedure, createTRPCRouter } from "../trpc";

const githubRouter = createTRPCRouter({
  // https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user
  getUser: baseProcedure
    .input(z.strictObject({ username: z.string() }))
    .output(githubUserSchema)
    .query(async (opts) => {
      try {
        const response = await getUser(opts.input);
        return response.data;
      } catch (error) {
        if (error instanceof RequestError && error.status === 404) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "The user could not be found.",
            cause: error,
          });
        } else {
          throw error;
        }
      }
    }),
  getPinnedItems: baseProcedure
    .input(z.strictObject({ login: z.string() }))
    .output(z.array(repositorySchema))
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
    .output(z.array(socialAccountSchema))
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
});

export { githubRouter };
