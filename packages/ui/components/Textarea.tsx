import type { ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const textareaVariants = tv({
  base: [
    "relative field-sizing-content w-full min-w-0 appearance-none rounded border bg-surface text-start",
    "placeholder:text-solid",
    "disabled:cursor-not-allowed disabled:bg-input disabled:opacity-50",
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
    size: "xs",
  },
});

type TextareaProps = ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textareaVariants>;

const Textarea = ({ className, size, ...props }: TextareaProps) => {
  return (
    <textarea className={textareaVariants({ className, size })} {...props} />
  );
};

export { textareaVariants, type TextareaProps, Textarea };
