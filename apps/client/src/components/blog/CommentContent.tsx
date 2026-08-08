import { Fragment, type ComponentPropsWithRef } from "react";

import { default as DOMPurify } from "dompurify";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { sanitize } from "hast-util-sanitize";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "tailwind-variants";

import type { Status } from "@jeremyng/api/schemas/mastodon/status";
import { Link } from "@jeremyng/ui/components/Link";

const CommentContent = ({ status }: { status: Status }) => {
  const sanitizedContent = DOMPurify.sanitize(status.content, {
    USE_PROFILES: { html: true },
  });
  const hastTree = sanitize(
    fromHtmlIsomorphic(sanitizedContent, {
      fragment: true,
    }),
  );

  return toJsxRuntime(hastTree, {
    Fragment,
    jsx,
    jsxs,
    components: {
      a: (props: ComponentPropsWithRef<"a">) => {
        return (
          <Link
            {...props}
            className={cn(props.className, "gap-0")}
            color="link"
          />
        );
      },
    },
  });
};

export { CommentContent };
