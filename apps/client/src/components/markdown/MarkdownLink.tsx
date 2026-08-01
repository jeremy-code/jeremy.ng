import { basename, extname } from "node:path";
import type { ComponentPropsWithRef } from "react";

import { Link as RouterLink } from "@tanstack/react-router";

import { Link, linkVariants } from "@jeremyng/ui/components/Link";

const MarkdownLink = ({ href, ...props }: ComponentPropsWithRef<"a">) => {
  // Hash or Absolute URL
  if (href === undefined || href?.startsWith("#") || URL.canParse(href)) {
    return <Link {...props} color="link" underline="hover" href={href} />;
  }

  return (
    <RouterLink
      {...props}
      className={linkVariants({ color: "link", underline: "hover" })}
      to="/blog/$slug"
      // Can't use function because otherwise
      // Server Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by m arking it with "use server". Or maybe you meant to call this function rather than return it.
      params={{
        slug: basename(href, extname(href)),
      }}
    >
      {props.children}
    </RouterLink>
  );
};

export { MarkdownLink };
