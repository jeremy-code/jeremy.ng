import type { ComponentProps } from "react";
import { Fragment } from "react";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import type { SpecialLanguage } from "shiki/core";
import { cn } from "tailwind-variants";

import {
  codeToHast,
  bundledLanguages,
  type BundledLanguage,
} from "#lib/shiki/createHighlighter";

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage | SpecialLanguage;
};

const CodeBlock = async (props: CodeBlockProps) => {
  const hastTree = await codeToHast(props.code, {
    lang:
      props.lang !== undefined && props.lang in bundledLanguages ?
        props.lang
      : "text",
    themes: {
      light: "github-light-default",
      dark: "github-dark-default",
    },
    defaultColor: "light-dark()",
  });

  return toJsxRuntime(hastTree, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props: ComponentProps<"pre">) => (
        <pre
          {...props}
          className={cn(
            props.className,
            "w-full max-w-full overflow-x-auto rounded-md border border-muted p-4 font-mono text-[0.85rem]",
          )}
        />
      ),
    },
  });
};

export { CodeBlock };
