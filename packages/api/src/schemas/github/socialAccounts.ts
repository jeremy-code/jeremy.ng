import * as z from "zod";

import type { SocialAccountProvider } from "../../generated/gql/graphql";

const socialAccountProviderSchema = z.toZod<SocialAccountProvider>()(
  z.enum([
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
  ]),
);

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
