import { Temporal } from "temporal-polyfill";

import { SsrDate } from "#components/common/SsrDate";
import {
  CarouselCard,
  carouselCardVariants,
  type CarouselCardProps,
} from "#components/misc/CarouselCard";
import type { NpmSearchObject } from "@jeremyng/api/schemas/npm/search";
import { Badge } from "@jeremyng/ui/components/Badge";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";
import { GitHub } from "@jeremyng/ui/icons/GitHub";
import { Npm } from "@jeremyng/ui/icons/Npm";

type NpmSearchObjectCardProps = {
  npmSearchObject: NpmSearchObject;
} & Omit<CarouselCardProps, "header" | "description" | "footer">;

const NpmSearchObjectCard = ({
  npmSearchObject,
  ...props
}: NpmSearchObjectCardProps) => {
  const dateInstant = Temporal.Instant.fromEpochMilliseconds(
    new Date(npmSearchObject.package.date).getTime(),
  );

  return (
    <CarouselCard
      {...props}
      header={
        <>
          <Badge>{npmSearchObject.package.version}</Badge>
          <Link
            className={carouselCardVariants({ size: props.size }).title()}
            href={npmSearchObject.package.links.npm}
            underline="hover"
          >
            {npmSearchObject.package.sanitized_name}
          </Link>
          <HorizontalList className="text-xs">
            {npmSearchObject.package.license !== undefined && (
              <HorizontalListItem>
                {npmSearchObject.package.license}
              </HorizontalListItem>
            )}
            <HorizontalListItem>
              <time dateTime={npmSearchObject.package.date}>
                <SsrDate
                  dateTime={dateInstant}
                  options={{ dateStyle: "medium", timeStyle: undefined }}
                />
              </time>
            </HorizontalListItem>
          </HorizontalList>
        </>
      }
      description={
        npmSearchObject.package.description ?? "Description was not found"
      }
      footer={
        <>
          <Link
            className={buttonVariants({ color: "gray", variant: "outline" })}
            href={npmSearchObject.package.links.npm}
          >
            <svg
              className="size-4 text-[#cb3837]"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <rect width="12.5" height="12.5" x="5.75" y="5.75" fill="white" />
              <Npm />
            </svg>
            <span className="max-sm:sr-only">npm</span>
          </Link>
          {npmSearchObject.package.links.repository !== undefined && (
            <a
              className={buttonVariants({ color: "gray", variant: "outline" })}
              href={npmSearchObject.package.links.repository.substring(
                "git+".length, // Remove "git+" prefix
              )}
            >
              <GitHub className="size-4" aria-hidden />
              <span className="max-sm:sr-only">GitHub</span>
            </a>
          )}
        </>
      }
    />
  );
};

export { NpmSearchObjectCard, type NpmSearchObjectCardProps };
