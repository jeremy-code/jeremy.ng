import { type ComponentPropsWithRef } from "react";

import { Markdown as MarkdownPrimitive } from "markdown-to-jsx/react";
import { cn } from "tailwind-variants";

type MarkdownProps = ComponentPropsWithRef<typeof MarkdownPrimitive>;

const Markdown = (props: MarkdownProps) => {
  return (
    <MarkdownPrimitive
      {...props}
      options={{
        wrapper: (props: ComponentPropsWithRef<"div">) => (
          <div
            {...props}
            className={cn(
              "flex flex-col items-start gap-4 py-4",
              props.className,
            )}
          />
        ),
        ...props.options,
      }}
    />
  );
};
export { Markdown };
