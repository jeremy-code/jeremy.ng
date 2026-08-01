import type { ComponentProps } from "react";
import { Fragment } from "react";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { useTheme } from "next-themes";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "tailwind-variants";

import { createHighlighter, type Language } from "#lib/shiki/createHighlighter";
import { assertNever } from "#utils/assertNever";

const highlighter = await createHighlighter({
  langs: [
    "css",
    "javascript",
    "json",
    "jsx",
    "python",
    "shell",
    "tsx",
    "typescript",
  ],
  themes: ["github-dark-default", "github-light-default"],
});

type CodeBlockProps = {
  code: string;
  lang: Language;
};

const CodeBlock = (props: CodeBlockProps) => {
  const { resolvedTheme } = useTheme();
  const hastTree = highlighter.codeToHast(props.code, {
    lang: props.lang,
    theme:
      resolvedTheme === "light" ? "github-light-default"
      : resolvedTheme === "dark" || resolvedTheme === undefined ?
        "github-dark-default"
      : assertNever(resolvedTheme as never),
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
