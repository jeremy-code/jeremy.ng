import type { ComponentPropsWithRef } from "react";

import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "tailwind-variants";

const {
  Root: Popover,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
} = PopoverPrimitive;

const PopoverContent = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Content>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={cn(
          "z-50 flex w-72 flex-col gap-2.5 rounded-md bg-surface p-2.5 text-sm text-foreground shadow-md",
          "ring ring-border",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "origin-(--radix-popover-content-transform-origin)",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

const PopoverArrow = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Arrow>) => {
  return (
    <PopoverPrimitive.Arrow
      className={cn(
        className,
        // https://gist.github.com/jeremy-code/66da292e53543e9d6c35aa85e3a2e53e
        "fill-surface stroke-border stroke-3 [stroke-dasharray:0_30_36.0555]",
      )}
      {...props}
    />
  );
};

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  PopoverArrow,
};
