import type { ComponentPropsWithRef } from "react";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const separatorVariants = tv({
  base: "border-muted",
  variants: {
    variant: {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    },
    orientation: {
      horizontal:
        "h-(--separator-thickness) border-t-(length:--separator-thickness)",
      vertical:
        "w-(--separator-thickness) border-s-(length:--separator-thickness)",
    },
    size: {
      xs: "[--separator-thickness:0.5px]",
      sm: "[--separator-thickness:1px]",
      md: "[--separator-thickness:2px]",
      lg: "[--separator-thickness:3px]",
    },
  },
  defaultVariants: { size: "sm", variant: "solid", orientation: "horizontal" },
});

type SeparatorProps = ComponentPropsWithRef<typeof SeparatorPrimitive> &
  VariantProps<typeof separatorVariants>;

const Separator = ({ variant, size, ...props }: SeparatorProps) => {
  return (
    <SeparatorPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, state) =>
        separatorVariants({ className, variant, size, ...state }),
      )}
    />
  );
};

export { Separator, type SeparatorProps, separatorVariants };
