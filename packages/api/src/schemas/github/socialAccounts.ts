import { z } from "zod";

const SocialAccountProvider = z.enum([
  "GENERIC",
  "FACEBOOK",
  "HOMETOWN",
  "INSTAGRAM",
  "LINKEDIN",
  "MASTODON",
  "REDDIT",
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

const UserSocialAccountsTotalCountResponse = z.strictObject({
  user: z.strictObject({
    socialAccounts: z.strictObject({
      totalCount: z.number(),
    }),
  }),
});
type UserSocialAccountsTotalCountResponse = z.infer<
  typeof UserSocialAccountsTotalCountResponse
>;

const UserSocialAccountsNodesResponse = z.strictObject({
  user: z.strictObject({
    socialAccounts: z.strictObject({
      nodes: z.array(SocialAccount),
    }),
  }),
});
type UserSocialAccountsNodesResponse = z.infer<
  typeof UserSocialAccountsNodesResponse
>;

export {
  SocialAccountProvider,
  SocialAccount,
  UserSocialAccountsTotalCountResponse,
  UserSocialAccountsNodesResponse,
};
