import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { TRPC_ENDPOINT } from "#lib/trpc/constants";
import { appRouter } from "@jeremyng/api";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

const handler = ({ request }: { request: Request }) => {
  return fetchRequestHandler({
    req: request,
    endpoint: TRPC_ENDPOINT,
    router: appRouter,
    responseMeta: ({ type, errors }) =>
      type === "query" && errors.length === 0 ?
        {
          headers: {
            "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          },
        }
      : {},
  });
};

const Route = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});

export { Route };
