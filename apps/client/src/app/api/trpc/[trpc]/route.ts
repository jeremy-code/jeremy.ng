import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

import { TRPC_ENDPOINT } from "#lib/trpc/constants";
import { appRouter } from "@jeremyng/api";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    req: request,
    endpoint: TRPC_ENDPOINT,
    router: appRouter,
    responseMeta: ({ type, errors }) =>
      type === "query" && errors.length === 0 ?
        {
          headers: new Headers({
            "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          }),
        }
      : {},
  });

export { handler as GET, handler as POST };
