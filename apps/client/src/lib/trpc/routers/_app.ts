import { createTRPCRouter } from "../init";
import { cloudflareRouter } from "./cloudflare";
import { contactRouter } from "./contact";
import { mailgunRouter } from "./mailgun";
import { npmRouter } from "./npm";

const appRouter = createTRPCRouter({
  cloudflare: cloudflareRouter,
  contact: contactRouter,
  mailgun: mailgunRouter,
  npm: npmRouter,
});

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
