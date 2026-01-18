"use client";

import type { CSSProperties } from "react";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "#lib/trpc/client";
import { dateCompareFn } from "#utils/dateCompareFn";
import { env } from "#utils/env";
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
    <ul
      className="grid grid-cols-1 gap-2 lg:grid-cols-[repeat(var(--numberOfPackages),minmax(0,1fr))]"
      style={
        {
          "--numberOfPackages": npmQuery.data?.objects.length,
        } as CSSProperties
      }
    >
      {npmQuery.data?.objects
        .toSorted((a, b) => -1 * dateCompareFn(a.package.date, b.package.date))
        .map((npmSearchObject) => (
          <NpmSearchObjectCard
            key={npmSearchObject.package.name}
            npmSearchObject={npmSearchObject}
          />
        ))}
    </ul>
  );
};
