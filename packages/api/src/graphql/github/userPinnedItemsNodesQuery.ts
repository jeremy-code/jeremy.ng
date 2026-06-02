import type { Query } from "@octokit/graphql/types";

const userPinnedItemsNodesQuery: Query = `
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

export { userPinnedItemsNodesQuery };
