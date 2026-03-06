import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { appRouter, type AppRouter } from "./routers/_app";

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { type RouterInputs, type RouterOutputs, appRouter, type AppRouter };
