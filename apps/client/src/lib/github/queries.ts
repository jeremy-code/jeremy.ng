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

const userPinnedItemsNodesQuery = `
  query UserPinnedItemsNodes(
    $login: String!
    $first: Int = 6
  ) {
    user(login: $login) {
      pinnedItems(
        first: $first
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
`;

export { userPinnedItemsTotalCountQuery, userPinnedItemsNodesQuery };
