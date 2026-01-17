"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "#lib/trpc/client";

export const UserList = () => {
  const trpc = useTRPC();
  const userQuery = useQuery(trpc.hello.queryOptions({ text: "Bilbo" }));

  return (
    <div>
      <p>{userQuery.data?.greeting}</p>
    </div>
  );
};
