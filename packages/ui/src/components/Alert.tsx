import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv, type VariantProps } from "tailwind-variants";

const alertVariants = tv({
  base: "flex w-full items-start rounded-md",
  variants: {
    color: {
      default: "bg-muted text-foreground",
      destructive: [
        "bg-red-300/30 text-red-800",
        "dark:bg-red-800/30 dark:text-red-300",
      ],
    },
    size: {
      sm: "gap-2 p-3 text-xs",
      md: "gap-3 p-4 text-sm",
      lg: "text-md gap-3 p-4",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type AlertProps = PrimitivePropsWithRef<"aside"> &
  VariantProps<typeof alertVariants>;

const Alert = ({ asChild, className, color, size, ...props }: AlertProps) => {
  const Comp = asChild ? Slot.Root : "aside";

  return (
    <Comp className={alertVariants({ color, className, size })} {...props} />
  );
};

const AlertIcon = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"span">) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      className={cn(
        "inline-flex size-[1em] shrink-0 items-center justify-center text-xl/7.5",
        className,
      )}
      {...props}
    />
  );
};

const AlertContent = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
  );
};

const AlertTitle = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return <Comp className={cn("font-medium", className)} {...props} />;
};

const AlertDescription = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return <Comp className={cn("inline", className)} {...props} />;
};

export {
  alertVariants,
  Alert,
  type AlertProps,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
};
