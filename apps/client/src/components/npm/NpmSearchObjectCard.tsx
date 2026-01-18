import type { NpmSearchObjectSchema } from "#schemas/npm/search";
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

const NpmSearchObjectCard = ({
  npmSearchObject,
  className,
  size,
}: {
  npmSearchObject: NpmSearchObjectSchema;
} & CardProps) => {
  const cardStyles = card({ className, size });

  return (
    <li className={cardStyles.base()}>
      <div className={cardStyles.header()}>
        <Badge className="w-fit">{npmSearchObject.package.version}</Badge>
        <Link
          className={cardStyles.title({ className: "block truncate" })}
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
              {dayjs(npmSearchObject.package.date).fromNow()}
            </time>
          </HorizontalListItem>
        </HorizontalList>
      </div>

      <div className={cardStyles.body()}>
        <p className={cardStyles.description({ className: "line-clamp-3" })}>
          {npmSearchObject.package.description}
        </p>
      </div>
      <div
        className={cardStyles.footer({
          className: "border-t bg-surface-darker pt-4",
        })}
      >
        {!!npmSearchObject.package.links.repository && (
          <a
            href={npmSearchObject.package.links.repository?.substring(
              "git+".length, // Remove "git+" prefix
            )}
          >
            <Button variant="outline">GitHub</Button>
          </a>
        )}

        <a href={npmSearchObject.package.links.npm}>
          <Button className="border-[#f87171] bg-transparent text-[#991919] hover:bg-[#fee2e2] dark:text-[#fca5a5] dark:hover:bg-[#300c0c]">
            npm
          </Button>
        </a>
      </div>
    </li>
  );
};

export { NpmSearchObjectCard };
