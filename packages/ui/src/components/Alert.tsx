import type { ComponentPropsWithRef } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

const alertVariants = tv({
  base: "flex w-full items-start rounded-md",
  variants: {
    color: {
      gray: "[--color-50:var(--color-gray-50)] [--color-100:var(--color-gray-100)] [--color-200:var(--color-gray-200)] [--color-300:var(--color-gray-300)] [--color-600:var(--color-gray-600)] [--color-700:var(--color-gray-700)] [--color-800:var(--color-gray-800)] [--color-950:var(--color-gray-950)]",
      primary:
        "[--color-50:var(--color-primary-50)] [--color-100:var(--color-primary-100)] [--color-200:var(--color-primary-200)] [--color-300:var(--color-primary-300)] [--color-600:var(--color-primary-600)] [--color-700:var(--color-primary-700)] [--color-800:var(--color-primary-800)] [--color-950:var(--color-primary-950)]",
      blue: "[--color-50:var(--color-blue-50)] [--color-100:var(--color-blue-100)] [--color-200:var(--color-blue-200)] [--color-300:var(--color-blue-300)] [--color-600:var(--color-blue-600)] [--color-700:var(--color-blue-700)] [--color-800:var(--color-blue-800)] [--color-950:var(--color-blue-950)]",
      red: "[--color-50:var(--color-red-50)] [--color-100:var(--color-red-100)] [--color-200:var(--color-red-200)] [--color-300:var(--color-red-300)] [--color-600:var(--color-red-600)] [--color-700:var(--color-red-700)] [--color-800:var(--color-red-800)] [--color-900:var(--color-red-900)] [--color-950:var(--color-red-950)]",
      yellow:
        "[--color-50:var(--color-yellow-50)] [--color-100:var(--color-yellow-100)] [--color-200:var(--color-yellow-200)] [--color-300:var(--color-yellow-300)] [--color-600:var(--color-yellow-600)] [--color-700:var(--color-yellow-700)] [--color-800:var(--color-yellow-800)] [--color-950:var(--color-yellow-950)]",
      purple:
        "[--color-50:var(--color-purple-50)] [--color-100:var(--color-purple-100)] [--color-200:var(--color-purple-200)] [--color-300:var(--color-purple-300)] [--color-600:var(--color-purple-600)] [--color-700:var(--color-purple-700)] [--color-800:var(--color-purple-800)] [--color-950:var(--color-purple-950)]",
      green:
        "[--color-50:var(--color-green-50)] [--color-100:var(--color-green-100)] [--color-200:var(--color-green-200)] [--color-300:var(--color-green-300)] [--color-600:var(--color-green-600)] [--color-700:var(--color-green-700)] [--color-800:var(--color-green-800)] [--color-950:var(--color-green-950)]",
    },
    variant: {
      subtle: [
        "bg-(--color-100) text-(--color-700)",
        "dark:bg-(--color-950) dark:text-(--color-300)",
      ],
      solid: "bg-(--color-600) text-(--color-50)",
      surface: [
        "border border-(--color-200) bg-(--color-100) text-(--color-700)",
        "dark:border-(--color-800) dark:bg-(--color-950) dark:text-(--color-300)",
      ],
      blue: [
        "bg-blue-300/30 text-blue-800",
        "dark:bg-blue-800/30 dark:text-blue-300",
      ],
      success: [
        "bg-green-300/30 text-green-800",
        "dark:bg-green-800/30 dark:text-green-300",
      ],
      purple: [
        "bg-purple-300/30 text-purple-800",
        "dark:bg-purple-800/30 dark:text-purple-300",
      ],
      yellow: [
        "bg-yellow-300/30 text-yellow-800",
        "dark:bg-yellow-800/30 dark:text-yellow-300",
      ],
    },
    size: {
      sm: "gap-2 p-3 text-xs",
      md: "gap-3 p-4 text-sm",
      lg: "gap-3 p-4 text-base",
    },
  },
  defaultVariants: {
    variant: "subtle",
    color: "gray",
    size: "md",
  },
});

type AlertProps = ComponentPropsWithRef<"aside"> &
  VariantProps<typeof alertVariants>;

const Alert = ({ className, variant, color, size, ...props }: AlertProps) => {
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
