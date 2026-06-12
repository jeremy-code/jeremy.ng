import { graphql } from "../../generated/gql";

const userPinnedItemsTotalCountQuery = graphql(`
  query UserPinnedItemsTotalCount($login: String!) {
    user(login: $login) {
      pinnedItems {
        totalCount
      }
    }
  }
`);

export { userPinnedItemsTotalCountQuery };
