import type { ComponentPropsWithRef } from "react";

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

type AlertProps = ComponentPropsWithRef<"aside"> &
  VariantProps<typeof alertVariants>;

const Alert = ({ className, color, size, ...props }: AlertProps) => {
  return (
    <aside className={alertVariants({ color, className, size })} {...props} />
  );
};

const AlertIcon = ({ className, ...props }: ComponentPropsWithRef<"span">) => {
  return (
    <span
      className={cn(
        "inline-flex size-[1em] shrink-0 items-center justify-center text-xl/7.5",
        className,
      )}
      {...props}
    />
  );
};

const AlertContent = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
  );
};

const AlertTitle = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
  return <div className={cn("font-medium", className)} {...props} />;
};

const AlertDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return <div className={cn("inline", className)} {...props} />;
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
