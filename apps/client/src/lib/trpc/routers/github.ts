import { graphql } from "@octokit/graphql";

import {
  PinnedItemsNodesSchema,
  PinnedItemsQueryParams,
  PinnedItemsTotalCountSchema,
  UserQueryParams,
} from "#schemas/github/graphql";
import { env } from "#utils/env";

import { baseProcedure, createTRPCRouter } from "../init";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
});

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
export const githubRouter = createTRPCRouter({
  /**
   * Without a count, an error of type "MISSING_PAGINATION_BOUNDARIES" and
   * message "You must provide a `first` or `last` value to properly paginate
   * the `pinnedItems` connection." will occur.
   */
  pinnedItemsCount: baseProcedure
    .input(UserQueryParams)
    .output(PinnedItemsTotalCountSchema)
    .query(async (opts) => {
      const response = await graphqlWithAuth<PinnedItemsTotalCountSchema>(
        `
          query UserPinnedItemsTotalCount($login: String!) {
            user(login: $login) {
              pinnedItems {
                totalCount
              }
            }
          }
        `,
        opts.input,
      );
      return response;
    }),
  pinnedItemsNodes: baseProcedure
    .input(PinnedItemsQueryParams)
    .output(PinnedItemsNodesSchema)
    .query(async (opts) => {
      const response = await graphqlWithAuth<PinnedItemsNodesSchema>(
        `
          query UserPinnedItemsNodes(
            $login: String!
            $first: Int
            $types: [PinnableItemType!]
            $after: String
            $before: String
            $last: Int
          ) {
            user(login: $login) {
              pinnedItems(
                first: $first
                types: $types
                after: $after
                before: $before
                last: $last
              ) {
                nodes {
                  ... on Repository {
                    createdAt
                    description
                    homepageUrl
                    id
                    licenseInfo {
                      id
                      key
                      name
                      spdxId
                      url
                    }
                    name
                    nameWithOwner
                    primaryLanguage {
                      color
                      id
                      name
                    }
                    pushedAt
                    stargazerCount
                    updatedAt
                    url
                  }
                }
              }
            }
          }
        `,
        opts.input,
      );
      return response;
    }),
});
