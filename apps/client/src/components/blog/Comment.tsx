import type { CSSProperties } from "react";

import { Temporal } from "temporal-polyfill";

import { SsrDate } from "#components/common/SsrDate";
import type { StatusWithReplies } from "@jeremyng/api/schemas/mastodon/status";
import { Card, CardBody } from "@jeremyng/ui/components/Card";
import { Link } from "@jeremyng/ui/components/Link";

import { CommentContent } from "./CommentContent";

type CommentProps = {
  status: StatusWithReplies;
  depth: number;
};

const Comment = ({ status, depth }: CommentProps) => {
  const createdAtInstant = Temporal.Instant.fromEpochMilliseconds(
    Date.parse(status.created_at),
  );

  return (
    <>
      <div
        className="ml-[calc(var(--depth)*(--spacing(4)))]"
        style={{ "--depth": depth } as CSSProperties}
      >
        <Card>
          <CardBody>
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <Link
                  className="group/link flex gap-2"
                  href={status.account.uri}
                >
                  <img
                    className="rounded-full"
                    src={status.account.avatar}
                    width="50px"
                    height="50px"
                    alt={
                      status.account.avatar_description ??
                      `${status.account.username} avatar`
                    }
                  />
                  <div className="flex flex-col">
                    <p className="group-hover/link:underline group-hover/link:decoration-current/80">
                      {status.account.display_name}
                    </p>
                    <p className="text-sm text-muted-foreground decoration-0 [text-decoration:none]">
                      @{status.account.acct}
                    </p>
                  </div>
                </Link>
                <Link
                  className="text-sm text-muted-foreground"
                  underline="hover"
                  href={status.uri}
                  title={status.created_at}
                >
                  <time dateTime={status.created_at}>
                    <SsrDate
                      dateTime={createdAtInstant}
                      options={{ dateStyle: "medium", timeStyle: undefined }}
                    />
                  </time>
                </Link>
              </div>
              <CommentContent status={status} />
            </div>
          </CardBody>
        </Card>
      </div>
      {status.replies.map((reply) => (
        <Comment key={reply.id} status={reply} depth={depth + 1} />
      ))}
    </>
  );
};

export { Comment, type CommentProps };
