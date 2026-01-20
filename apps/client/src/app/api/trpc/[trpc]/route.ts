import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

import { TRPC_ENDPOINT } from "#lib/trpc/constants";
import { appRouter } from "#lib/trpc/routers/_app";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    endpoint: TRPC_ENDPOINT,
    req: request,
    router: appRouter,
    responseMeta({ type, errors }) {
      if (type === "query" && errors.length === 0) {
        return {
          headers: new Headers({
            "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          }),
        };
      }
      return {};
    },
  });

export { handler as GET, handler as POST };
