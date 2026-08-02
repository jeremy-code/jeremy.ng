import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

const MarkdownFooter = (props: ComponentPropsWithRef<"footer">) => {
  return (
    <footer
      {...props}
      className={cn(
        props.className,
        "block w-full border-t border-t-border p-2",
      )}
    />
  );
};

export { MarkdownFooter };
