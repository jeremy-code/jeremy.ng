import type { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import {
  createTRPCOptionsProxy,
  type TRPCOptionsProxy,
} from "@trpc/tanstack-react-query";

import { CatchBoundary } from "#components/misc/CatchBoundary";
import { NotFound } from "#components/misc/NotFound";
import { getBaseUrl } from "#functions/getBaseUrl";
import { getQueryClient } from "#lib/trpc/queryClient";
import { createTrpcClient } from "#lib/trpc/shared";
import type { AppRouter } from "@jeremyng/api";

import { routeTree } from "./generated/routeTree.gen";

type RouterContext = {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<AppRouter>;
};

const getRouter = () => {
  const queryClient = getQueryClient();
  const context = {
    queryClient,
    trpc: createTRPCOptionsProxy({
      client: createTrpcClient(getBaseUrl()),
      queryClient,
    }),
  } satisfies RouterContext;

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context,
    defaultErrorComponent: CatchBoundary,
    defaultNotFoundComponent: NotFound,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};

export { getRouter, type RouterContext };
