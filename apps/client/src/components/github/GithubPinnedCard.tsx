import type { CSSProperties } from "react";

import { Star } from "lucide-react";
import { AccessibleIcon } from "radix-ui";

import type { RepositorySchema } from "#schemas/github/graphql";
import { dayjs } from "#utils/date";
import { Badge } from "@jeremyng/ui/components/Badge";
import { Button } from "@jeremyng/ui/components/Button";
import {
  cardVariants as card,
  type CardProps,
} from "@jeremyng/ui/components/Card";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";

const GithubPinnedCard = ({
  pinnedItemNode,
  className,
  size,
}: {
  pinnedItemNode: RepositorySchema;
} & CardProps) => {
  const cardStyles = card({ className, size });

  return (
    <div className={cardStyles.base({ className: "h-full" })}>
      <div className={cardStyles.header()}>
        <div className="flex gap-1">
          <Badge className="w-fit">
            <div
              className="size-2 rounded-full bg-(--language-color)"
              style={
                {
                  "--language-color": pinnedItemNode.primaryLanguage?.color,
                } as CSSProperties
              }
            />
            {pinnedItemNode.primaryLanguage?.name}
          </Badge>
        </div>
        <Link
          className={cardStyles.title({ className: "block truncate" })}
          href={pinnedItemNode.url}
          underline="hover"
        >
          {pinnedItemNode.name}
        </Link>
        <HorizontalList className="text-xs">
          <HorizontalListItem>
            {pinnedItemNode.licenseInfo?.spdxId}
          </HorizontalListItem>
          <HorizontalListItem>
            <time dateTime={pinnedItemNode.updatedAt}>
              {dayjs(pinnedItemNode.updatedAt).fromNow()}
            </time>
          </HorizontalListItem>
          <HorizontalListItem className="inline-block align-text-bottom">
            <span className="flex h-3.75 items-center gap-0.5">
              <AccessibleIcon.Root label="Stars">
                <Star size={15} />
              </AccessibleIcon.Root>
              {pinnedItemNode.stargazerCount}
            </span>
          </HorizontalListItem>
        </HorizontalList>
      </div>
      <div className={cardStyles.body()}>
        <p className={cardStyles.description({ className: "line-clamp-3" })}>
          {pinnedItemNode.description}
        </p>
      </div>
      <div
        className={cardStyles.footer({
          className: "border-t bg-surface-darker pt-4",
        })}
      >
        <Link href={pinnedItemNode.url}>
          <Button variant="outline">GitHub</Button>
        </Link>
      </div>
    </div>
  );
};

export { GithubPinnedCard };
