import { graphql } from "../../generated/gql";

const userSocialAccountsNodesQuery = graphql(`
  query userSocialAccountsNodes($login: String!, $first: Int = 6) {
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
`);

export { userSocialAccountsNodesQuery };
