"use client";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "#lib/trpc/client";
import { env } from "#utils/env";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@jeremyng/ui/components/Carousel";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

import { GithubPinnedCard } from "./GithubPinnedCard";

export const GithubPinnedList = () => {
  const trpc = useTRPC();
  const pinnedItemsTotalCountQuery = useQuery(
    trpc.github.pinnedItemsCount.queryOptions({
      login: env.NEXT_PUBLIC_GITHUB_USERNAME,
    }),
  );
  const pinnedItemsNodesQuery = useQuery(
    trpc.github.pinnedItemsNodes.queryOptions({
      login: env.NEXT_PUBLIC_GITHUB_USERNAME,
      first: pinnedItemsTotalCountQuery.data?.user.pinnedItems.totalCount ?? 6,
    }),
  );

  if (pinnedItemsNodesQuery.isLoading) {
    return <Skeleton className="h-64" />;
  }

  return (
    <Carousel options={{ align: "start" }}>
      <CarouselControls />
      <CarouselContent>
        {(pinnedItemsNodesQuery.data?.user.pinnedItems.nodes ?? []).map(
          (pinnedItemNode) => (
            <CarouselItem
              className="h-64 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              key={pinnedItemNode.id}
            >
              <GithubPinnedCard pinnedItemNode={pinnedItemNode} />
            </CarouselItem>
          ),
        )}
      </CarouselContent>
    </Carousel>
  );
};
