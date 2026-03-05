import { graphql } from "@octokit/graphql";

import { env } from "#utils/env";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
});

export { graphqlWithAuth };
