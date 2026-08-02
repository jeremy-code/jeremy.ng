import type { ComponentPropsWithRef } from "react";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const buttonVariants = tv({
  base: [
    "relative inline-flex items-center justify-center rounded align-middle font-medium transition select-none",
    "shrink-0", // If inside a flex container, don't let the button shrink
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    color: {
      gray: "[--color-50:var(--color-gray-50)] [--color-100:var(--color-gray-100)] [--color-200:var(--color-gray-200)] [--color-300:var(--color-gray-300)] [--color-500:var(--color-gray-500)] [--color-600:var(--color-gray-600)] [--color-700:var(--color-gray-700)] [--color-800:var(--color-gray-800)] [--color-900:var(--color-gray-900)] [--color-950:var(--color-gray-950)]",
      primary:
        "[--color-50:var(--color-primary-50)] [--color-100:var(--color-primary-100)] [--color-200:var(--color-primary-200)] [--color-300:var(--color-primary-300)] [--color-500:var(--color-primary-500)] [--color-600:var(--color-primary-600)] [--color-700:var(--color-primary-700)] [--color-800:var(--color-primary-800)] [--color-900:var(--color-primary-900)] [--color-950:var(--color-primary-950)]",
      blue: "[--color-50:var(--color-blue-50)] [--color-100:var(--color-blue-100)] [--color-200:var(--color-blue-200)] [--color-300:var(--color-blue-300)] [--color-500:var(--color-blue-500)] [--color-600:var(--color-blue-600)] [--color-700:var(--color-blue-700)] [--color-800:var(--color-blue-800)] [--color-900:var(--color-blue-900)] [--color-950:var(--color-blue-950)]",
      red: "[--color-50:var(--color-red-50)] [--color-100:var(--color-red-100)] [--color-200:var(--color-red-200)] [--color-300:var(--color-red-300)] [--color-500:var(--color-red-500)] [--color-600:var(--color-red-600)] [--color-700:var(--color-red-700)] [--color-800:var(--color-red-800)] [--color-900:var(--color-red-900)] [--color-950:var(--color-red-950)]",
    },
    variant: {
      solid: "bg-(--color-600) text-(--color-50) hover:bg-(--color-500)",
      subtle: [
        "bg-(--color-200) text-(--color-900) hover:bg-(--color-300)",
        "dark:bg-(--color-600)/25 dark:text-(--color-200) dark:hover:bg-(--color-700)",
      ],
      surface: [
        "border border-(--color-200) bg-(--color-100) text-(--color-700)",
        "hover:bg-(--color-200) dark:border-(--color-800) dark:bg-(--color-950) dark:text-(--color-300) dark:hover:bg-(--color-800)",
      ],
      outline: [
        "border border-(--color-300) bg-transparent text-(--color-700) hover:bg-(--color-200)",
        "dark:border-(--color-700) dark:text-(--color-300) dark:hover:bg-(--color-600)/25",
      ],
      ghost: [
        "bg-transparent text-(--color-950) hover:bg-(--color-200)",
        "dark:text-(--color-50) dark:hover:bg-(--color-600)/25",
      ],
    },
    size: {
      xs: "h-8 min-w-8 gap-1 px-2.5 text-xs/4",
      sm: "h-9 min-w-9 gap-2 px-3.5 text-sm/5",
      md: "h-10 min-w-10 gap-2 px-4 text-sm/5",
      lg: "h-11 min-w-11 gap-3 px-5 text-base/6",
      icon: "h-10 min-w-10 gap-2 text-sm/5",
    },
  },
  defaultVariants: {
    variant: "surface",
    color: "gray",
    size: "md",
  },
});

type ButtonProps = ComponentPropsWithRef<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, size, color, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      {...props}
      className={composeRenderProps(props.className, (className) =>
        buttonVariants({ className, variant, size, color }),
      )}
    />
  );
};

export { Button, type ButtonProps, buttonVariants };
