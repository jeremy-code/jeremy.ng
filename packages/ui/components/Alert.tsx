import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv, type VariantProps } from "tailwind-variants";

const alertVariants = tv({
  base: ["relative flex w-full items-start gap-3 rounded-md p-4 text-sm/5"],
  variants: {
    color: {
      default: "bg-muted text-foreground",
      destructive:
        "bg-red-300/30 text-red-800 dark:bg-red-800/30 dark:text-red-300",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type AlertProps = PrimitivePropsWithRef<"div"> &
  VariantProps<typeof alertVariants>;

const Alert = ({ asChild, className, color, ...props }: AlertProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      role="alert"
      className={alertVariants({ color, className })}
      {...props}
    />
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
