import { graphql } from "../../generated/gql";

const userBioQuery = graphql(`
  query UserBio($login: String!) {
    user(login: $login) {
      bio
    }
  }
`);

export { userBioQuery };
