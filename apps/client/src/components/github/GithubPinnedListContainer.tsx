import { Suspense } from "react";

import { TriangleAlert } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { graphqlWithAuth } from "#lib/github/graphql";
import type { UserPinnedItemsNodesResponse } from "#lib/github/interfaces";
import {
  userPinnedItemsNodesQuery,
  userPinnedItemsTotalCountQuery,
} from "#lib/github/queries";
import { env } from "#utils/env";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@jeremyng/ui/components/Alert";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

import {
  GithubPinnedList,
  type GithubPinnedListProps,
} from "./GithubPinnedList";

const pinnedItemsNodes = graphqlWithAuth<{
  user: { pinnedItems: { totalCount: number } };
}>(userPinnedItemsTotalCountQuery, {
  login: env.NEXT_PUBLIC_GITHUB_USERNAME,
}).then((data) =>
  graphqlWithAuth<UserPinnedItemsNodesResponse>(userPinnedItemsNodesQuery, {
    login: env.NEXT_PUBLIC_GITHUB_USERNAME,
    first: data.user.pinnedItems.totalCount,
  }),
);

type GithubPinnedListContainerProps = Omit<
  GithubPinnedListProps,
  "pinnedItemsNodesPromise"
>;

const GithubPinnedListContainer = (props: GithubPinnedListContainerProps) => {
  return (
    <ErrorBoundary
      fallback={
        <Alert color="destructive">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while fetching from GitHub. Please try again
              later.
            </AlertDescription>
          </AlertContent>
        </Alert>
      }
    >
      <Suspense fallback={<Skeleton className="h-64" />}>
        <GithubPinnedList
          pinnedItemsNodesPromise={pinnedItemsNodes}
          {...props}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export { GithubPinnedListContainer, type GithubPinnedListContainerProps };
