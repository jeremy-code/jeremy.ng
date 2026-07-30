import { graphql } from "@octokit/graphql";
import type { RequestParameters } from "@octokit/graphql/types";

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

const octokitGraphql = <TResult, TVariables extends RequestParameters>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
) =>
  graphql<TResult>(query.toString(), {
    ...variables,
    headers: {
      authorization: `token ${env.GITHUB_TOKEN}`,
    },
  });

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
