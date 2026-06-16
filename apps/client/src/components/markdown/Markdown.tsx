import { type ComponentPropsWithRef } from "react";

import { Markdown as MarkdownPrimitive } from "markdown-to-jsx/react";

import { MarkdownWrapper } from "./MarkdownWrapper";

type MarkdownProps = ComponentPropsWithRef<typeof MarkdownPrimitive>;

const Markdown = (props: MarkdownProps) => {
  return (
    <MarkdownPrimitive
      {...props}
      options={{
        wrapper: MarkdownWrapper,
        ...props.options,
      }}
    />
  );
};
export { Markdown };
