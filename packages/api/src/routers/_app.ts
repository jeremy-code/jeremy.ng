import { createTRPCRouter } from "../trpc";
import { cloudflareRouter } from "./cloudflare";
import { contactRouter } from "./contact";
import { npmRouter } from "./npm";

const appRouter = createTRPCRouter({
  cloudflare: cloudflareRouter,
  contact: contactRouter,
  npm: npmRouter,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
