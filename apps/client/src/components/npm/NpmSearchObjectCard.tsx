import { ClientOnly } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

import {
  CarouselCard,
  carouselCardVariants,
  type CarouselCardProps,
} from "#components/misc/CarouselCard";
import type { NpmSearchObject } from "@jeremyng/api/schemas/npm/search";
import { Badge } from "@jeremyng/ui/components/Badge";
import { Button } from "@jeremyng/ui/components/Button";
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
        <div className="items-start">
          <Badge>{npmSearchObject.package.version}</Badge>
          <Link
            className={carouselCardVariants({
              className: props.className,
              size: props.size,
            }).title()}
            href={npmSearchObject.package.links.npm}
            underline="hover"
          >
            {npmSearchObject.package.sanitized_name}
          </Link>
          <HorizontalList className="text-xs">
            <HorizontalListItem>
              {npmSearchObject.package.license}
            </HorizontalListItem>
            <HorizontalListItem>
              <time dateTime={npmSearchObject.package.date}>
                <ClientOnly
                  fallback={dateInstant
                    .toZonedDateTimeISO("UTC")
                    .toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: undefined,
                    })}
                >
                  {dateInstant.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: undefined,
                  })}
                </ClientOnly>
              </time>
            </HorizontalListItem>
          </HorizontalList>
        </div>
      }
      description={
        <p className="line-clamp-3">{npmSearchObject.package.description}</p>
      }
      footer={
        <div className="flex-nowrap">
          <Button color="default" variant="outline" asChild>
            <Link href={npmSearchObject.package.links.npm}>
              <Npm className="size-4 text-[#cb3837]" aria-hidden />
              <span className="max-sm:hidden">npm</span>
            </Link>
          </Button>
          {!!npmSearchObject.package.links.repository && (
            <Button color="default" variant="outline" asChild>
              <a
                href={npmSearchObject.package.links.repository?.substring(
                  "git+".length, // Remove "git+" prefix
                )}
              >
                <GitHub className="size-4" aria-hidden />
                <span className="max-sm:hidden">GitHub</span>
              </a>
            </Button>
          )}
        </div>
      }
    />
  );
};

export { NpmSearchObjectCard, type NpmSearchObjectCardProps };
