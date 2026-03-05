import type { CSSProperties } from "react";

import { Star } from "lucide-react";
import { AccessibleIcon } from "radix-ui";
import { tv } from "tailwind-variants";

import type { Repository } from "#lib/github/interfaces";
import { dayjs } from "#utils/date";
import { Badge } from "@jeremyng/ui/components/Badge";
import { Button } from "@jeremyng/ui/components/Button";
import { cardVariants, type CardProps } from "@jeremyng/ui/components/Card";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";

type GithubPinnedCardProps = {
  pinnedItemNode: Repository;
} & CardProps;

const githubPinnedCardVariants = tv({
  extend: cardVariants,
  slots: {
    base: "h-full",
    footer: "border-t bg-surface-darker pt-4",
    title: "truncate",
    description: "line-clamp-3",
  },
});

const GithubPinnedCard = ({
  pinnedItemNode,
  className,
  size,
  ...props
}: GithubPinnedCardProps) => {
  const cardStyles = githubPinnedCardVariants({ className, size });

  return (
    <div className={cardStyles.base()} {...props}>
      <div className={cardStyles.header()}>
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
        <Link
          className={cardStyles.title()}
          href={pinnedItemNode.url}
          underline="hover"
        >
          {pinnedItemNode.name}
        </Link>
        <HorizontalList className="text-xs">
          {!!pinnedItemNode.licenseInfo && (
            <HorizontalListItem>
              {pinnedItemNode.licenseInfo?.spdxId}
            </HorizontalListItem>
          )}
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
        <p className={cardStyles.description()}>{pinnedItemNode.description}</p>
      </div>
      <div className={cardStyles.footer()}>
        <Link href={pinnedItemNode.url}>
          <Button color="default" variant="outline">
            GitHub
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { GithubPinnedCard, type GithubPinnedCardProps };
