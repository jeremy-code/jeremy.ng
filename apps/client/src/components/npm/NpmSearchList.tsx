"use client";

import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { useTRPC } from "#lib/trpc/client";
import { dateCompareFn } from "#utils/dateCompareFn";
import { env } from "#utils/env";
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

import { NpmSearchObjectCard } from "./NpmSearchObjectCard";

type NpmSearchListProps = CarouselProps;

const NpmSearchList = ({ options, ...props }: NpmSearchListProps) => {
  const trpc = useTRPC();
  const npmSearchQuery = useQuery(
    trpc.npm.search.queryOptions({
      text: `author:${env.NEXT_PUBLIC_NPM_REGISTRY_USERNAME}`,
    }),
  );

  if (npmSearchQuery.isLoading) {
    return <Skeleton className="h-64" />;
  } else if (npmSearchQuery.isError) {
    return (
      <Alert color="destructive">
        <AlertIcon>
          <TriangleAlert />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while fetching from npm. Please try again later.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  }

  return (
    <Carousel options={{ align: "start", ...options }} {...props}>
      <CarouselControls />
      <CarouselContent>
        {(npmSearchQuery.data?.objects ?? [])
          .toSorted(
            (a, b) => -1 * dateCompareFn(a.package.date, b.package.date),
          )
          .map((npmSearchObject) => (
            <CarouselItem
              key={npmSearchObject.package.name}
              className="h-64 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <NpmSearchObjectCard npmSearchObject={npmSearchObject} />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};

export { NpmSearchList, type NpmSearchListProps };
