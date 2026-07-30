import * as z from "zod";

const socialAccountProviderSchema = z.enum([
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
type SocialAccountProvider = z.infer<typeof socialAccountProviderSchema>;

const socialAccountSchema = z.strictObject({
  displayName: z.string().min(1),
  provider: socialAccountProviderSchema,
  url: z.url(),
});

export {
  socialAccountProviderSchema,
  type SocialAccountProvider,
  socialAccountSchema,
};
