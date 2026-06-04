import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { env } from "#config/env";
import { useTRPC } from "#lib/trpc/client";
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@jeremyng/ui/components/Alert";
import {
  Carousel,
  type CarouselProps,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@jeremyng/ui/components/Carousel";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

import { GithubPinnedCard } from "./GithubPinnedCard";

type GithubPinnedListProps = CarouselProps;

const GithubPinnedList = (props: GithubPinnedListProps) => {
  const trpc = useTRPC();
  const {
    isPending,
    isError,
    data: githubPinnedItems,
  } = useQuery(
    trpc.github.getPinnedItems.queryOptions({
      login: env.VITE_GITHUB_USERNAME,
    }),
  );

  if (isPending) {
    return <Skeleton className="h-64" />;
  } else if (isError) {
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
    <Carousel {...props}>
      <CarouselControls />
      <CarouselContent>
        {githubPinnedItems.map((pinnedItemNode) => (
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
