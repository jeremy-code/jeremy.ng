import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";
import { Mail, TriangleAlert } from "lucide-react";
import { AccessibleIcon } from "radix-ui";

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
import { GitHub } from "@jeremyng/ui/icons/GitHub";
import { LinkedIn } from "@jeremyng/ui/icons/LinkedIn";
import { Mastodon } from "@jeremyng/ui/icons/Mastodon";
import { Npm } from "@jeremyng/ui/icons/Npm";

const SOCIAL_ACCOUNTS_PROVIDER_MAP: Record<
  SocialAccountProvider | "GITHUB" | "EMAIL",
  ReactNode
> = {
  GENERIC: "Generic",
  FACEBOOK: "Facebook",
  HOMETOWN: "Hometown",
  INSTAGRAM: "Instagram",
  LINKEDIN: (
    <LinkedIn className="[--color-linkedin-foreground:var(--color-background)]" />
  ),
  MASTODON: <Mastodon />,
  REDDIT: "Reddit",
  TWITCH: "Twitch",
  TWITTER: "Twitter",
  YOUTUBE: "YouTube",
  BLUESKY: "Bluesky",
  NPM: <Npm className="[--color-npm-foreground:var(--color-background)]" />,
  GITHUB: <GitHub />,
  EMAIL: <Mail />,
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
    return <Skeleton className="h-26" />;
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
    <address>
      <DataList>
        {(
          [
            ...githubSocialAccounts,
            {
              displayName: env.VITE_GITHUB_USERNAME,
              provider: "GITHUB",
              url: `https://github.com/${env.VITE_GITHUB_USERNAME}`,
            },
            {
              displayName: "hi@jeremy.ng",
              provider: "EMAIL",
              url: "mailto:hi@jeremy.ng",
            },
          ] as const
        ).map((socialAccount) => {
          const label = SOCIAL_ACCOUNTS_PROVIDER_MAP[socialAccount.provider];

          return (
            <DataListItem className="items-center" key={socialAccount.url}>
              <DataListItemLabel>
                {typeof label === "string" ?
                  label
                : <AccessibleIcon.Root label={socialAccount.provider}>
                    {label}
                  </AccessibleIcon.Root>
                }
              </DataListItemLabel>
              <DataListItemValue>
                <Link color="link" underline="hover" href={socialAccount.url}>
                  {socialAccount.displayName}
                </Link>
              </DataListItemValue>
            </DataListItem>
          );
        })}
      </DataList>
    </address>
  );
};

export { SocialAccountsList };
