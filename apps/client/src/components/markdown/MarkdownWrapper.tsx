import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

type MarkdownWrapperProps = ComponentPropsWithRef<"div">;

const MarkdownWrapper = ({ className, ...props }: MarkdownWrapperProps) => {
  return (
    <div
      className={cn("flex flex-col items-start gap-4", className)}
      {...props}
    />
  );
};

export { MarkdownWrapper };
