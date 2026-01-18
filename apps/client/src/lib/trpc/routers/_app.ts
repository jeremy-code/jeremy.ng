import { createTRPCRouter } from "../init";
import { npmRouter } from "./npm";

export const appRouter = createTRPCRouter({
  npm: npmRouter,
});

export type AppRouter = typeof appRouter;
