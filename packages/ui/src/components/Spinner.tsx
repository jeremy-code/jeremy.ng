import type { ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const spinnerVariants = tv({
  base: [
    "inline-block animate-spin rounded-full border-2 border-foreground border-x-transparent border-b-transparent",
  ],
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-8",
      xl: "size-10",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type SpinnerProps = ComponentPropsWithRef<"span"> &
  VariantProps<typeof spinnerVariants>;

const Spinner = ({ className, size, ...props }: SpinnerProps) => {
  return (
    <span
      role="progressbar"
      aria-label="Loading..."
      className={spinnerVariants({ className, size })}
      {...props}
    />
  );
};

export { spinnerVariants, Spinner, type SpinnerProps };
