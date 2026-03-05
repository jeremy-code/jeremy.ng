"use client";

import { use } from "react";

import type { UserPinnedItemsNodesResponse } from "#lib/github/interfaces";
import {
  Carousel,
  type CarouselProps,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@jeremyng/ui/components/Carousel";

import { GithubPinnedCard } from "./GithubPinnedCard";

type GithubPinnedListProps = {
  pinnedItemsNodesPromise: Promise<UserPinnedItemsNodesResponse>;
} & CarouselProps;

const GithubPinnedList = ({
  pinnedItemsNodesPromise,
  options,
  ...props
}: GithubPinnedListProps) => {
  const pinnedItemsNodes = use(pinnedItemsNodesPromise).user.pinnedItems.nodes;

  return (
    <Carousel options={{ align: "start", ...options }} {...props}>
      <CarouselControls />
      <CarouselContent>
        {pinnedItemsNodes.map((pinnedItemNode) => (
          <CarouselItem
            className="h-64 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            key={pinnedItemNode.id}
          >
            <GithubPinnedCard pinnedItemNode={pinnedItemNode} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export { GithubPinnedList, type GithubPinnedListProps };
