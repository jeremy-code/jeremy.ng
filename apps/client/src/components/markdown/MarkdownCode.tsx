import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

const MarkdownCode = (props: ComponentPropsWithRef<"code">) => {
  return (
    <code
      {...props}
      className={cn(
        "m-0 rounded-md bg-muted px-[0.4em] py-[0.2em] font-mono text-[85%] whitespace-break-spaces",
        props.className,
      )}
    />
  );
};

export { MarkdownCode };
