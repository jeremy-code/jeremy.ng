import type { HTMLElementType } from "react";

import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

type HTMLHeadingElementType = Extract<HTMLElementType, `h${number}`>;

const headingVariants = tv({
  base: "text-foreground",
  variants: {
    fontWeight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
      extrablack: "font-[950]",
    },
    size: {
      xs: "text-xs/4",
      sm: "text-sm/5",
      md: "text-base/6",
      lg: "text-lg/[1.6875rem]",
      xl: "text-xl/[1.875rem]",
      "2xl": "text-2xl/9",
      "3xl": "text-3xl/[2.8125rem]",
      "4xl": "text-4xl/[3.375rem]",
      "5xl": "text-5xl/[4.5rem]",
      "6xl": "text-6xl/[5.625rem]",
      "7xl": "text-7xl/[6.75rem]",
      "8xl": "text-8xl/36",
      "9xl": "text-9xl/48",
    },
  },
  defaultVariants: { size: "md", fontWeight: "semibold" },
});

type HeadingProps = {
  as?: HTMLHeadingElementType;
} & PrimitivePropsWithRef<HTMLHeadingElementType> &
  VariantProps<typeof headingVariants>;

const Heading = ({
  as,
  asChild,
  className,
  size,
  fontWeight,
  ...props
}: HeadingProps) => {
  const Comp = asChild ? Slot.Root : (as ?? "h1");

  return (
    <Comp
      className={twMerge(headingVariants({ className, size, fontWeight }))}
      {...(asChild && {
        role: "heading",
        "aria-level": as === undefined ? 1 : Number(as[1]),
      })}
      {...props}
    />
  );
};

export { Heading, type HeadingProps };
