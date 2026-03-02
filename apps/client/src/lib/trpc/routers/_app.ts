import { createTRPCRouter } from "../init";
import { githubRouter } from "./github";
import { npmRouter } from "./npm";

const appRouter = createTRPCRouter({
  github: githubRouter,
  npm: npmRouter,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
