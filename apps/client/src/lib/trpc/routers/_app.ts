import { createTRPCRouter } from "../init";
import { githubRouter } from "./github";
import { npmRouter } from "./npm";

export const appRouter = createTRPCRouter({
  github: githubRouter,
  npm: npmRouter,
});

export type AppRouter = typeof appRouter;
