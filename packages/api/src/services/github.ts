import type { RequestParameters } from "@octokit/graphql/types";
import { Octokit } from "octokit";

import type {
  TypedDocumentString,
  UserPinnedItemsNodesQueryVariables,
  UserPinnedItemsTotalCountQueryVariables,
  UserSocialAccountsNodesQueryVariables,
  UserSocialAccountsTotalCountQueryVariables,
} from "../generated/gql/graphql";
import { userPinnedItemsNodesQuery } from "../graphql/github/userPinnedItemsNodesQuery";
import { userPinnedItemsTotalCountQuery } from "../graphql/github/userPinnedItemsTotalCountQuery";
import { userSocialAccountsNodesQuery } from "../graphql/github/userSocialAccountsNodesQuery";
import { userSocialAccountsTotalCountQuery } from "../graphql/github/userSocialAccountsTotalCountQuery";
import { env } from "../utils/env";

const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

const octokitGraphql = <TResult, TVariables extends RequestParameters>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
) => octokit.graphql<TResult>(query.toString(), variables);

const getUser = octokit.rest.users.getByUsername;

const getPinnedItemsTotalCount = (
  input: UserPinnedItemsTotalCountQueryVariables,
) => octokitGraphql(userPinnedItemsTotalCountQuery, input);

const getPinnedItemsNodes = (input: UserPinnedItemsNodesQueryVariables) =>
  octokitGraphql(userPinnedItemsNodesQuery, input);

const getSocialAccountsTotalCount = (
  input: UserSocialAccountsTotalCountQueryVariables,
) => octokitGraphql(userSocialAccountsTotalCountQuery, input);

const getSocialAccountsNodes = (input: UserSocialAccountsNodesQueryVariables) =>
  octokitGraphql(userSocialAccountsNodesQuery, input);

export {
  getUser,
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
};
