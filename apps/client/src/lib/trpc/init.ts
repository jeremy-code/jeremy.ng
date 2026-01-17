import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

export const {
  router: createTRPCRouter,
  createCallerFactory,
  procedure: baseProcedure,
} = t;
