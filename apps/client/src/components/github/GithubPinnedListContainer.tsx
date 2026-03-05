import { Suspense } from "react";

import { graphqlWithAuth } from "#lib/github/graphql";
import type { UserPinnedItemsNodesResponse } from "#lib/github/interfaces";
import {
  userPinnedItemsNodesQuery,
  userPinnedItemsTotalCountQuery,
} from "#lib/github/queries";
import { env } from "#utils/env";
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
    <Suspense fallback={<Skeleton className="h-64" />}>
      <GithubPinnedList pinnedItemsNodesPromise={pinnedItemsNodes} {...props} />
    </Suspense>
  );
};

export { GithubPinnedListContainer, type GithubPinnedListContainerProps };
