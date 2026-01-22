import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import { env } from "#utils/env";
import {
  HorizontalList,
  HorizontalListItem,
} from "@jeremyng/ui/components/HorizontalList";
import { Link } from "@jeremyng/ui/components/Link";

export const Footer = ({
  className,
  ...props
}: ComponentPropsWithRef<"footer">) => {
  return (
    <footer
      className={cn("grid place-content-center border-t", className)}
      {...props}
    >
      <div className="container py-4">
        <HorizontalList>
          <HorizontalListItem>
            <Link
              href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`}
              underline="hover"
            >
              Jeremy Nguyen
            </Link>
          </HorizontalListItem>
          <HorizontalListItem>
            <Link
              href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}/jeremy.ng`}
              underline="hover"
            >
              Source code
            </Link>
          </HorizontalListItem>
        </HorizontalList>
      </div>
    </footer>
  );
};
