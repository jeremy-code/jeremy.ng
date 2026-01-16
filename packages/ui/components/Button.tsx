import { Slot } from "radix-ui";
import { type PrimitivePropsWithRef } from "radix-ui/internal";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "relative inline-flex cursor-pointer items-center justify-center rounded align-middle font-medium transition select-none",
    "shrink-0", // If inside a flex container, don't let the button shrink
  ],
  variants: {
    variant: {
      primary:
        "bg-primary-solid text-primary-solid-foreground hover:bg-primary-solid/90",
      secondary: "border border-muted bg-subtle text-foreground hover:bg-muted",
    },
    size: {
      xs: "h-8 min-w-8 gap-1 px-2.5 text-xs/4",
      sm: "h-9 min-w-9 gap-2 px-3.5 text-sm/5",
      md: "h-10 min-w-10 gap-2 px-4 text-sm/5",
      lg: "h-11 min-w-11 gap-3 px-5 leading-6",
      icon: "h-10 min-w-10 gap-2 text-sm/5",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export type ButtonProps = PrimitivePropsWithRef<"button"> &
  VariantProps<typeof button>;

export const Button = ({
  asChild,
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={button({ className, variant, size })} {...props} />;
};
