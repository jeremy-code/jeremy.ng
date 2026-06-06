import type { Query } from "@octokit/graphql/types";

const userSocialAccountsTotalCountQuery: Query = `
  query userSocialAccountsTotalCountQuery($login: String!) {
    user(login: $login) {
      socialAccounts {
        totalCount
      }
    }
  }
`;

export { userSocialAccountsTotalCountQuery };
