import type { ComponentProps } from "react";
import { Fragment } from "react";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "tailwind-variants";

import {
  bundledLanguagesKeys,
  bundledThemesKeys,
  createHighlighter,
  type BundledLanguage,
} from "#lib/shiki/createHighlighter";

const highlighter = await createHighlighter({
  langs: bundledLanguagesKeys,
  themes: bundledThemesKeys,
});

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage;
};

const CodeBlock = (props: CodeBlockProps) => {
  const hastTree = highlighter.codeToHast(props.code, {
    lang:
      props.lang !== undefined && bundledLanguagesKeys.includes(props.lang) ?
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
            "w-full max-w-full overflow-x-auto rounded-md p-4 font-mono text-[85%]",
          )}
        />
      ),
    },
  });
};

export { CodeBlock };
