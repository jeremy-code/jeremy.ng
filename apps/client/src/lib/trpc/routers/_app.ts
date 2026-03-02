import { createTRPCRouter } from "../init";
import { cloudflareRouter } from "./cloudflare";
import { githubRouter } from "./github";
import { npmRouter } from "./npm";

const appRouter = createTRPCRouter({
  cloudflare: cloudflareRouter,
  github: githubRouter,
  npm: npmRouter,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
