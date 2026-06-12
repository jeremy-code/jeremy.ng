import { graphql } from "../../generated/gql";

const userPinnedItemsNodesQuery = graphql(`
  query UserPinnedItemsNodes($login: String!, $first: Int = 6) {
    user(login: $login) {
      pinnedItems(first: $first) {
        nodes {
          __typename
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
`);

export { userPinnedItemsNodesQuery };
