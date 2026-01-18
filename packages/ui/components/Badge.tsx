import { Slot } from "radix-ui";
import { type PrimitivePropsWithRef } from "radix-ui/internal";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: [
    "inline-flex items-center gap-1 rounded font-medium whitespace-nowrap tabular-nums select-none",
  ],
  variants: {
    color: {
      gray: "bg-subtle text-foreground",
      primary: "bg-primary-subtle text-primary-foreground",
    },
    size: {
      xs: "min-h-4 px-1 text-[0.625rem]/3",
      sm: "min-h-5 px-1.5 text-xs/4",
      md: "min-h-6 px-2 text-sm/5",
      lg: "min-h-7 px-2.5 text-sm/5",
    },
  },
  defaultVariants: {
    color: "gray",
    size: "sm",
  },
});

type BadgeProps = PrimitivePropsWithRef<"div"> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ asChild, className, color, ...props }: BadgeProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={badgeVariants({ className, color })} {...props} />;
};

export { Badge, type BadgeProps };
