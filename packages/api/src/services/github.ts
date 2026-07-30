import type { RequestParameters } from "@octokit/graphql/types";
import { Octokit } from "octokit";

import type {
  TypedDocumentString,
  UserBioQueryVariables,
  UserPinnedItemsNodesQueryVariables,
  UserPinnedItemsTotalCountQueryVariables,
  UserSocialAccountsNodesQueryVariables,
  UserSocialAccountsTotalCountQueryVariables,
} from "../generated/gql/graphql";
import { userBioQuery } from "../graphql/github/userBioQuery";
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

const getBio = (input: UserBioQueryVariables) =>
  octokitGraphql(userBioQuery, input);

export {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
  getSocialAccountsTotalCount,
  getSocialAccountsNodes,
  getBio,
};
