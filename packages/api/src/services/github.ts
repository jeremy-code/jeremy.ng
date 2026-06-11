import { graphql } from "@octokit/graphql";
import { z } from "zod";

import { env } from "../config/env";
import { userPinnedItemsNodesQuery } from "../graphql/github/userPinnedItemsNodesQuery";
import { userPinnedItemsTotalCountQuery } from "../graphql/github/userPinnedItemsTotalCountQuery";
import { userSocialAccountsNodesQuery } from "../graphql/github/userSocialAccountsNodesQuery";
import { userSocialAccountsTotalCountQuery } from "../graphql/github/userSocialAccountsTotalCountQuery";
import {
  UserPinnedItemsNodesRequestParams,
  UserPinnedItemsNodesResponse,
  UserPinnedItemsTotalCountRequestParams,
  UserPinnedItemsTotalCountResponse,
} from "../schemas/github/pinnedItems";
import {
  UserSocialAccountsNodesRequestParams,
  UserSocialAccountsNodesResponse,
  UserSocialAccountsTotalCountRequestParams,
  UserSocialAccountsTotalCountResponse,
} from "../schemas/github/socialAccounts";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
});

const getPinnedItemsTotalCount = z
  .function({
    input: [UserPinnedItemsTotalCountRequestParams],
    output: UserPinnedItemsTotalCountResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserPinnedItemsTotalCountResponse>(
      userPinnedItemsTotalCountQuery,
      input,
    ),
  );

const getPinnedItemsNodes = z
  .function({
    input: [UserPinnedItemsNodesRequestParams],
    output: UserPinnedItemsNodesResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserPinnedItemsNodesResponse>(
      userPinnedItemsNodesQuery,
      input,
    ),
  );

const getSocialAccountsTotalCount = z
  .function({
    input: [UserSocialAccountsTotalCountRequestParams],
    output: UserSocialAccountsTotalCountResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserSocialAccountsTotalCountResponse>(
      userSocialAccountsTotalCountQuery,
      input,
    ),
  );

const getSocialAccountsNodes = z
  .function({
    input: [UserSocialAccountsNodesRequestParams],
    output: UserSocialAccountsNodesResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserSocialAccountsNodesResponse>(
      userSocialAccountsNodesQuery,
      input,
    ),
  );

export {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
};
