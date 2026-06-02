import type { Query } from "@octokit/graphql/types";

const userPinnedItemsTotalCountQuery: Query = `
  query UserPinnedItemsTotalCount($login: String!) {
    user(login: $login) {
      pinnedItems {
        totalCount
      }
    }
  }
`;

export { userPinnedItemsTotalCountQuery };
