import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { TRPC_ENDPOINT } from "#lib/trpc/constants";
import { appRouter } from "#lib/trpc/routers/_app";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: TRPC_ENDPOINT,
    req: request,
    router: appRouter,
  });

export { handler as GET, handler as POST };
