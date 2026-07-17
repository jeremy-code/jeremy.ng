import type { ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: [
    "inline-flex items-center gap-1 rounded font-medium whitespace-nowrap tabular-nums select-none",
  ],
  variants: {
    color: {
      gray: "bg-muted text-foreground",
      primary: "bg-primary-subtle text-primary-foreground",
    },
    size: {
      xs: "min-h-4 px-1 text-xxs/3",
      sm: "min-h-5 px-1.5 text-xs/4",
      md: "min-h-6 px-2 text-sm/5",
      lg: "min-h-7 px-2.5 text-sm/5",
    },
  },
  defaultVariants: { color: "gray", size: "sm" },
});

type BadgeProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ className, color, ...props }: BadgeProps) => {
  return <div className={badgeVariants({ className, color })} {...props} />;
};

export { Badge, type BadgeProps };
