import type { CSSProperties } from "react";

import { LinkIcon, Star } from "lucide-react";
import { Temporal } from "temporal-polyfill";

import { SsrDate } from "#components/common/SsrDate";
import {
  CarouselCard,
  type CarouselCardProps,
  carouselCardVariants,
} from "#components/misc/CarouselCard";
import type { Repository } from "@jeremyng/api/schemas/github/pinnedItems";
import { Badge } from "@jeremyng/ui/components/Badge";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";
import { GitHub } from "@jeremyng/ui/icons/GitHub";

type GithubPinnedCardProps = {
  pinnedItemNode: Repository;
} & Omit<CarouselCardProps, "header" | "description" | "footer">;

const GithubPinnedCard = ({
  pinnedItemNode,
  ...props
}: GithubPinnedCardProps) => {
  const updatedAtInstant = Temporal.Instant.fromEpochMilliseconds(
    new Date(pinnedItemNode.updatedAt).getTime(),
  );

  return (
    <CarouselCard
      {...props}
      header={
        <>
          <Badge
            className="before:size-2 before:rounded-full before:bg-(--language-color)"
            style={
              {
                "--language-color": pinnedItemNode.primaryLanguage?.color,
              } as CSSProperties
            }
          >
            {pinnedItemNode.primaryLanguage?.name}
          </Badge>
          <Link
            className={carouselCardVariants({
              className: props.className,
              size: props.size,
            }).title()}
            href={pinnedItemNode.url}
            underline="hover"
          >
            {pinnedItemNode.name}
          </Link>
          <HorizontalList className="text-xs">
            {!!pinnedItemNode.licenseInfo && (
              <HorizontalListItem>
                {(
                  pinnedItemNode.licenseInfo.url !== undefined &&
                  pinnedItemNode.licenseInfo.spdxId !== undefined
                ) ?
                  <Link
                    href={pinnedItemNode.licenseInfo.url ?? undefined}
                    underline="hover"
                  >
                    {pinnedItemNode.licenseInfo?.spdxId}
                  </Link>
                : pinnedItemNode.licenseInfo.spdxId !== undefined ?
                  pinnedItemNode.licenseInfo.spdxId
                : pinnedItemNode.licenseInfo.name}
              </HorizontalListItem>
            )}
            <HorizontalListItem>
              <time dateTime={pinnedItemNode.updatedAt}>
                <SsrDate
                  dateTime={updatedAtInstant}
                  options={{ dateStyle: "medium", timeStyle: undefined }}
                />
              </time>
            </HorizontalListItem>
            <HorizontalListItem className="inline-block align-text-bottom">
              <span
                className="flex h-3.75 items-center gap-0.5"
                aria-label="Stars"
              >
                <Star size={15} aria-disabled />
                {pinnedItemNode.stargazerCount}
              </span>
            </HorizontalListItem>
          </HorizontalList>
        </>
      }
      description={pinnedItemNode.description}
      footer={
        <>
          {pinnedItemNode.homepageUrl !== null &&
            pinnedItemNode.homepageUrl !== "" &&
            pinnedItemNode.homepageUrl !== pinnedItemNode.url && (
              <Link
                className={buttonVariants({
                  color: "gray",
                  variant: "outline",
                })}
                href={pinnedItemNode.homepageUrl}
              >
                <LinkIcon className="size-4" aria-hidden />
                URL
              </Link>
            )}
          <Link
            className={buttonVariants({
              color: "gray",
              variant: "outline",
            })}
            href={pinnedItemNode.url}
          >
            <GitHub className="size-4" aria-hidden />
            GitHub
          </Link>
        </>
      }
    />
  );
};

export { GithubPinnedCard, type GithubPinnedCardProps };
