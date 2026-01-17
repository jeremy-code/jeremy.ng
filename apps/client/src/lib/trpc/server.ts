import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { appRouter } from "./routers/_app";

const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer: superjson,
});

export { helpers };
