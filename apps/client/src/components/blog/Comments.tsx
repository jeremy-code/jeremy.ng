import { useQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

import { useTRPC } from "#lib/trpc/client";
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@jeremyng/ui/components/Alert";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import { Link } from "@jeremyng/ui/components/Link";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

import { Comment } from "./Comment";

const Comments = ({ mastodonId }: { mastodonId: string }) => {
  const {
    isPending,
    isError,
    data: mastodonStatusResult,
    error,
  } = useQuery(
    useTRPC().mastodon.getStatus.queryOptions({
      statusId: mastodonId,
    }),
  );

  if (isPending) {
    return <Skeleton className="h-12" />;
  } else if (isError) {
    console.error(error);
    return (
      <Alert color="red">
        <AlertIcon>
          <TriangleAlert />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while fetching from Mastodon. Please try again
            later.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  }

  if (mastodonStatusResult.replies.length === 0) {
    return (
      <div>
        {"There are currently zero comments. Leave a comment "}
        <Link color="link" href={mastodonStatusResult.url ?? undefined}>
          on Mastodon
        </Link>
        {" or any Fediverse-compatible instance."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {mastodonStatusResult.replies.map((reply) => (
        <Comment key={reply.id} status={reply} />
      ))}
      <a
        className={buttonVariants({ color: "gray", variant: "surface" })}
        href={mastodonStatusResult?.uri}
      >
        Add a comment on Mastodon
      </a>
    </div>
  );
};

export { Comments };
