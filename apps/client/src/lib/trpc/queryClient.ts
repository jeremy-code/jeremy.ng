import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { serialize, deserialize } from "superjson";

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      dehydrate: {
        serializeData: serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: deserialize,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Creates a new {@link QueryClient} on the server or reuses a singleton on the
 * client.
 */
export const getQueryClient = () =>
  typeof window === "undefined" ? makeQueryClient() : (
    (browserQueryClient ??= makeQueryClient())
  );
