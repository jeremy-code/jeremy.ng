import * as z from "zod";

import type {
  SocialAccountProvider,
  UserSocialAccountsNodesQuery,
} from "../../generated/gql/graphql";

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

type GqlSocialAccount = Exclude<
  Exclude<
    Exclude<
      UserSocialAccountsNodesQuery["user"],
      null
    >["socialAccounts"]["nodes"],
    null
  >[number],
  null
>;

const socialAccountSchema = z.toZod<GqlSocialAccount>()(
  z.strictObject({
    displayName: z.string().min(1),
    provider: socialAccountProviderSchema,
    url: z.url(),
  }),
);

export {
  socialAccountProviderSchema,
  type SocialAccountProvider,
  socialAccountSchema,
};
