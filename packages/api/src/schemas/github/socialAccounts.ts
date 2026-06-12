import { z } from "zod";

const SocialAccountProvider = z.enum([
  "GENERIC",
  "FACEBOOK",
  "HOMETOWN",
  "INSTAGRAM",
  "LINKEDIN",
  "MASTODON",
  "REDDIT",
  "THREADS",
  "TWITCH",
  "TWITTER",
  "YOUTUBE",
  "BLUESKY",
  "NPM",
]);
type SocialAccountProvider = z.infer<typeof SocialAccountProvider>;

const SocialAccount = z.strictObject({
  displayName: z.string().min(1),
  provider: SocialAccountProvider,
  url: z.url(),
});

export { SocialAccountProvider, SocialAccount };
