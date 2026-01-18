import type { ComponentProps } from "react";

import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "tailwind-variants";

type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

const Separator = ({ className, ...props }: SeparatorProps) => (
  <SeparatorPrimitive.Root
    className={cn(
      "bg-muted data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className,
    )}
    {...props}
  />
);

export { Separator, type SeparatorProps };
