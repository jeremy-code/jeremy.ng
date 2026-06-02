import { graphql } from "@octokit/graphql";
import { z } from "zod";

import { env } from "../config/env";
import { userPinnedItemsNodesQuery } from "../graphql/github/userPinnedItemsNodesQuery";
import { userPinnedItemsTotalCountQuery } from "../graphql/github/userPinnedItemsTotalCountQuery";
import {
  UserPinnedItemsNodesResponse,
  UserPinnedItemsTotalCountResponse,
} from "../schemas/github/pinnedItems";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
});

const getPinnedItemsTotalCount = z
  .function({
    input: [z.strictObject({ login: z.string() })],
    output: UserPinnedItemsTotalCountResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserPinnedItemsTotalCountResponse>(
      userPinnedItemsTotalCountQuery,
      input,
    ),
  );

const getPinnedItemsNodes = z
  .function({
    input: [z.strictObject({ login: z.string(), first: z.int32().optional() })],
    output: UserPinnedItemsNodesResponse,
  })
  .implementAsync((input) =>
    graphqlWithAuth<UserPinnedItemsNodesResponse>(
      userPinnedItemsNodesQuery,
      input,
    ),
  );

export { getPinnedItemsTotalCount, getPinnedItemsNodes };
