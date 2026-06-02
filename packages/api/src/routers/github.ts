import { z } from "zod";

import { Repository } from "../schemas/github/pinnedItems";
import {
  getPinnedItemsTotalCount,
  getPinnedItemsNodes,
} from "../services/github";
import { baseProcedure, createTRPCRouter } from "../trpc";

const githubRouter = createTRPCRouter({
  getPinnedItems: baseProcedure
    .input(z.strictObject({ login: z.string() }))
    .output(z.array(Repository))
    .query(async (opts) => {
      const { totalCount } = (await getPinnedItemsTotalCount(opts.input)).user
        .pinnedItems;

      if (totalCount === 0) {
        return [];
      }

      return (
        await getPinnedItemsNodes({
          ...opts.input,
          first: totalCount,
        })
      ).user.pinnedItems.nodes;
    }),
});

export { githubRouter };
