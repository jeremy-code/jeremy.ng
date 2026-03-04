import { Slot } from "radix-ui";
import { type PrimitivePropsWithRef } from "radix-ui/internal";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: [
    "relative inline-flex cursor-pointer items-center justify-center rounded align-middle font-medium transition select-none",
    "shrink-0", // If inside a flex container, don't let the button shrink
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    color: { primary: null, default: null, destructive: null },
    variant: { surface: "border", solid: null, outline: "border" },
    size: {
      xs: "h-8 min-w-8 gap-1 px-2.5 text-xs/4",
      sm: "h-9 min-w-9 gap-2 px-3.5 text-sm/5",
      md: "h-10 min-w-10 gap-2 px-4 text-sm/5",
      lg: "h-11 min-w-11 gap-3 px-5 text-base/6",
      icon: "h-10 min-w-10 gap-2 text-sm/5",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "surface",
      className:
        "border-primary-muted bg-primary-subtle text-primary-foreground hover:bg-primary-muted",
    },
    {
      color: "default",
      variant: "surface",
      className: "border-muted bg-subtle text-foreground hover:bg-muted",
    },
    {
      color: "primary",
      variant: "solid",
      className:
        "bg-primary-solid text-primary-solid-foreground hover:bg-primary-solid/80",
    },
    {
      color: "destructive",
      variant: "solid",
      className:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    },
    {
      color: "default",
      variant: "outline",
      className: "border-border bg-background text-foreground hover:bg-subtle",
    },
  ],
  defaultVariants: {
    color: "primary",
    variant: "surface",
    size: "md",
  },
});

type ButtonProps = PrimitivePropsWithRef<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  asChild,
  className,
  color,
  variant,
  size,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={buttonVariants({ className, color, variant, size })}
      {...props}
    />
  );
};

export { Button, type ButtonProps };
