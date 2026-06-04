import { useState, type ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCContext } from "@trpc/tanstack-react-query";

import { getBaseUrl } from "#functions/getBaseUrl";
import type { AppRouter } from "@jeremyng/api";

import { getQueryClient } from "./queryClient";
import { createTrpcClient } from "./shared";

const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

const TrpcReactProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => createTrpcClient(getBaseUrl()));

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export { TRPCProvider, useTRPC, useTRPCClient, TrpcReactProvider };
