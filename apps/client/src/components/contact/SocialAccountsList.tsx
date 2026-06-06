import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { env } from "#config/env";
import { useTRPC } from "#lib/trpc/client";
import { SocialAccountProvider } from "@jeremyng/api/schemas/github/socialAccounts";
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@jeremyng/ui/components/Alert";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@jeremyng/ui/components/DataList";
import { Link } from "@jeremyng/ui/components/Link";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

const SOCIAL_ACCOUNTS_PROVIDER_MAP: Record<SocialAccountProvider, string> = {
  GENERIC: "Generic",
  FACEBOOK: "Facebook",
  HOMETOWN: "Hometown",
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  MASTODON: "Mastodon",
  REDDIT: "Reddit",
  TWITCH: "Twitch",
  TWITTER: "Twitter",
  YOUTUBE: "YouTube",
  BLUESKY: "Bluesky",
  NPM: "NPM",
};

const SocialAccountsList = () => {
  const trpc = useTRPC();
  const {
    isPending,
    isError,
    data: githubSocialAccounts,
    error,
  } = useQuery(
    trpc.github.getSocialAccounts.queryOptions({
      login: env.VITE_GITHUB_USERNAME,
    }),
  );

  if (isPending) {
    return <Skeleton className="h-23" />;
  } else if (isError) {
    console.error(error);
    return (
      <Alert color="destructive">
        <AlertIcon>
          <TriangleAlert />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while fetching from Github. Please try again
            later.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  }

  return (
    <DataList>
      {githubSocialAccounts.map((socialAccount) => (
        <DataListItem key={socialAccount.url}>
          <DataListItemLabel>
            {SOCIAL_ACCOUNTS_PROVIDER_MAP[socialAccount.provider]}
          </DataListItemLabel>
          <DataListItemValue>
            <Link color="link" underline="hover" href={socialAccount.url}>
              {socialAccount.displayName}
            </Link>
          </DataListItemValue>
        </DataListItem>
      ))}
      <DataListItem>
        <DataListItemLabel>GitHub</DataListItemLabel>
        <DataListItemValue>
          <Link
            color="link"
            underline="hover"
            href={`https://github.com/${env.VITE_GITHUB_USERNAME}`}
          >
            {env.VITE_GITHUB_USERNAME}
          </Link>
        </DataListItemValue>
      </DataListItem>
    </DataList>
  );
};

export { SocialAccountsList };
