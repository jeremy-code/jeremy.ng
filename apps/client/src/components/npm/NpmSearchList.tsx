import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { env } from "#config/env";
import { useTRPC } from "#lib/trpc/client";
import { dateCompareFn } from "#utils/dateCompareFn";
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

const NpmSearchList = (props: NpmSearchListProps) => {
  const trpc = useTRPC();
  const {
    isPending,
    isError,
    data: npmSearchQueryResult,
    error,
  } = useQuery(
    trpc.npm.search.queryOptions({
      text: `author:${env.VITE_NPM_REGISTRY_USERNAME}`,
    }),
  );

  if (isPending) {
    return <Skeleton className="h-64" />;
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
            An error occurred while fetching from npm. Please try again later.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  }

  return (
    <Carousel {...props}>
      <CarouselControls />
      <CarouselContent>
        {npmSearchQueryResult.objects
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
