"use client";

import { useState, type ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, type TRPCLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import superjson from "superjson";

import { getBaseUrl } from "#utils/getBaseUrl";

import { TRPC_ENDPOINT } from "./constants";
import { getQueryClient } from "./queryClient";
import type { AppRouter } from "./routers/_app";

const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

const links = [
  httpBatchLink({
    url: `${getBaseUrl()}${TRPC_ENDPOINT}`,
    transformer: superjson,
  }),
] satisfies TRPCLink<AppRouter>[];

const TrpcReactProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => createTRPCClient<AppRouter>({ links }));

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export { TRPCProvider, useTRPC, useTRPCClient, TrpcReactProvider };
