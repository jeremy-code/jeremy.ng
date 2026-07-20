import type { ComponentPropsWithRef } from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const inputVariants = tv({
  base: [
    "flex h-9 w-full appearance-none rounded border border-border bg-surface py-1 text-start motion-safe:transition-opacity",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-solid",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
    "data-invalid:border-destructive",
  ],
  variants: {
    size: {
      xs: "h-8 min-w-8 px-2 text-xs/4",
      sm: "h-9 min-w-9 px-2.5 text-sm/5",
      md: "h-10 min-w-10 px-3 text-sm/5",
      lg: "h-11 min-w-11 px-4 text-base/6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type InputProps = ComponentPropsWithRef<typeof InputPrimitive> &
  VariantProps<typeof inputVariants>;

const Input = ({ size, ...props }: InputProps) => {
  return (
    <InputPrimitive
      {...props}
      className={composeRenderProps(props.className, (className) =>
        inputVariants({ size, className }),
      )}
    />
  );
};

export { Input, type InputProps, inputVariants };
