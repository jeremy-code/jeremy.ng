import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import { getHeaders } from "#functions/getHeaders";
import type { AppRouter } from "@jeremyng/api";

import { TRPC_ENDPOINT } from "./constants";

const createTrpcClient = (apiUrl: string) => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchStreamLink({
        url: `${apiUrl}${TRPC_ENDPOINT}`,
        transformer: superjson,
        headers: () => getHeaders(),
      }),
    ],
  });
};

export { createTrpcClient };
