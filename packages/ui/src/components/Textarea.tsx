import type { ComponentPropsWithRef } from "react";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const textareaVariants = tv({
  base: [
    "relative field-sizing-content w-full min-w-0 appearance-none rounded border bg-surface text-start",
    "placeholder:text-solid",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-destructive",
  ],
  variants: {
    size: {
      xs: "px-2 py-1.5 text-xs/4",
      sm: "px-2.5 py-2 text-sm/5",
      md: "px-3 py-2 text-sm/5",
      lg: "px-4 py-3 text-base/6",
      xl: "px-4.5 py-3.5 text-base/6",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type TextareaProps = ComponentPropsWithRef<typeof FieldPrimitive.Control> &
  VariantProps<typeof textareaVariants>;

const Textarea = ({ size, ...props }: TextareaProps) => {
  return (
    <FieldPrimitive.Control
      render={<textarea />}
      {...props}
      className={composeRenderProps(props.className, (className) =>
        textareaVariants({ className, size }),
      )}
    />
  );
};

export { textareaVariants, Textarea, type TextareaProps };
