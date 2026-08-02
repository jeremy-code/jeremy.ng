import { createTRPCRouter } from "../trpc";
import { contactRouter } from "./contact";
import { githubRouter } from "./github";
import { mastodonRouter } from "./mastodon";
import { npmRouter } from "./npm";

const appRouter = createTRPCRouter({
  contact: contactRouter,
  github: githubRouter,
  mastodon: mastodonRouter,
  npm: npmRouter,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
