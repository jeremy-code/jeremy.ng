import { type ComponentPropsWithRef } from "react";

import { Markdown as MarkdownPrimitive, RuleType } from "markdown-to-jsx/react";
import slugify from "slugify";

import { CodeBlock } from "#components/common/CodeBlock";
import type { BundledLanguage } from "#lib/shiki/createHighlighter";

import { isAlertType, MarkdownAlert } from "./MarkdownAlert";
import { MarkdownWrapper } from "./MarkdownWrapper";
import { MARKDOWN_OVERRIDES } from "./constants";

type MarkdownProps = ComponentPropsWithRef<typeof MarkdownPrimitive>;

const Markdown = (props: MarkdownProps) => {
  return (
    <MarkdownPrimitive
      {...props}
      options={{
        overrides: MARKDOWN_OVERRIDES,
        slugify: (input) => slugify(input),
        renderRule: (next, node, renderChildren, state) => {
          if (node.type === RuleType.codeBlock) {
            return (
              <CodeBlock
                key={state.key}
                code={node.text}
                lang={(node.lang as BundledLanguage) ?? "text"}
              />
            );
          }
          if (node.type === RuleType.blockQuote && isAlertType(node.alert)) {
            return (
              <MarkdownAlert type={node.alert} key={state.key}>
                {renderChildren(node.children, state)}
              </MarkdownAlert>
            );
          }

          return next();
        },
        wrapper: MarkdownWrapper,
        ...props.options,
      }}
    />
  );
};

export { Markdown };
