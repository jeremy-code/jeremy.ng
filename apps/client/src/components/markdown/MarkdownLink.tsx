import { normalize, parse } from "node:path";
import type { ComponentPropsWithRef } from "react";

import { Link as RouterLink } from "@tanstack/react-router";

import { Link, linkVariants } from "@jeremyng/ui/components/Link";

const MarkdownLink = ({ href, ...props }: ComponentPropsWithRef<"a">) => {
  // Undefined, hash, or absolute URL (i.e. has protocol)
  if (href === undefined || href?.startsWith("#") || URL.canParse(href)) {
    return <Link {...props} color="link" underline="hover" href={href} />;
  }

  const parsedNormalizedHref = parse(normalize(href));

  // Relative URL to .md file in the same directory
  if (parsedNormalizedHref.ext === ".md" && parsedNormalizedHref.dir === "") {
    return (
      // Looks like using Link from #components/common results in
      // Error: Unexpectedly client reference export 'createLink' is called on server
      <RouterLink
        {...props}
        className={linkVariants({ color: "link", underline: "hover" })}
        to="/blog/$slug"
        params={{
          slug: parsedNormalizedHref.name,
        }}
      />
    );
  }

  // Relative URL (possibly asset)
  return <Link {...props} color="link" underline="hover" href={href} />;
};

export { MarkdownLink };
