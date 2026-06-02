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

type NpmSearchObjectCardProps = {
  npmSearchObject: NpmSearchObject;
} & Omit<CarouselCardProps, "header" | "description" | "footer">;

const NpmSearchObjectCard = ({
  npmSearchObject,
  ...props
}: NpmSearchObjectCardProps) => {
  return (
    <CarouselCard
      {...props}
      header={
        <div>
          <Badge className="w-fit">{npmSearchObject.package.version}</Badge>
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
                {Temporal.Instant.fromEpochMilliseconds(
                  new Date(npmSearchObject.package.date).getTime(),
                ).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: undefined,
                })}
              </time>
            </HorizontalListItem>
          </HorizontalList>
        </div>
      }
      description={<p>{npmSearchObject.package.description}</p>}
      footer={
        <div>
          {!!npmSearchObject.package.links.repository && (
            <a
              href={npmSearchObject.package.links.repository?.substring(
                "git+".length, // Remove "git+" prefix
              )}
            >
              <Button color="default" variant="outline">
                GitHub
              </Button>
            </a>
          )}

          <a href={npmSearchObject.package.links.npm}>
            <Button className="border-[#f87171] bg-transparent text-[#991919] hover:bg-[#fee2e2] dark:text-[#fca5a5] dark:hover:bg-[#300c0c]">
              npm
            </Button>
          </a>
        </div>
      }
    />
  );
};

export { NpmSearchObjectCard, type NpmSearchObjectCardProps };
