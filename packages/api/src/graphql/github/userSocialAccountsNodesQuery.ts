import type { Query } from "@octokit/graphql/types";

const userSocialAccountsNodesQuery: Query = `
  query userSocialAccountsNodesQuery(
    $login: String!
    $first: Int = 6
  ) {
    user(login: $login) {
      socialAccounts(first: $first) {
        nodes {
          displayName
          provider
          url
        }
      }
    }
  }
`;

export { userSocialAccountsNodesQuery };
