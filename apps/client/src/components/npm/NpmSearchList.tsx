"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "#lib/trpc/client";
import { dateCompareFn } from "#utils/dateCompareFn";
import { env } from "#utils/env";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@jeremyng/ui/components/Carousel";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

import { NpmSearchObjectCard } from "./NpmSearchObjectCard";

export const NpmSearchList = () => {
  const trpc = useTRPC();
  const npmQuery = useQuery(
    trpc.npm.search.queryOptions({
      text: `author:${env.NEXT_PUBLIC_NPM_REGISTRY_USERNAME}`,
    }),
  );

  if (npmQuery.isLoading) {
    return <Skeleton className="h-64" />;
  }

  return (
    <Carousel>
      <CarouselControls />
      <CarouselContent>
        {npmQuery.data?.objects
          .toSorted(
            (a, b) => -1 * dateCompareFn(a.package.date, b.package.date),
          )
          .map((npmSearchObject) => (
            <CarouselItem
              className="h-64 basis-full md:basis-1/2 lg:basis-1/3"
              key={npmSearchObject.package.name}
            >
              <NpmSearchObjectCard npmSearchObject={npmSearchObject} />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};
