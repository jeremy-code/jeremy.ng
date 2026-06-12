import { graphql } from "../../generated/gql";

const userSocialAccountsTotalCountQuery = graphql(`
  query userSocialAccountsTotalCount($login: String!) {
    user(login: $login) {
      socialAccounts {
        totalCount
      }
    }
  }
`);

export { userSocialAccountsTotalCountQuery };
