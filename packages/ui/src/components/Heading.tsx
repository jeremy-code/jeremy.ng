import type { ComponentPropsWithRef, HTMLElementType } from "react";

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
      lg: "text-lg/6.75",
      xl: "text-xl/7.5",
      "2xl": "text-2xl/9",
      "3xl": "text-3xl/11.25",
      "4xl": "text-4xl/13.5",
      "5xl": "text-5xl/18",
      "6xl": "text-6xl/22.5",
      "7xl": "text-7xl/27",
      "8xl": "text-8xl/36",
      "9xl": "text-9xl/48",
    },
  },
  defaultVariants: { size: "md", fontWeight: "semibold" },
});

type HeadingProps = {
  as?: HTMLHeadingElementType;
} & ComponentPropsWithRef<HTMLHeadingElementType> &
  VariantProps<typeof headingVariants>;

const Heading = ({
  as,
  className,
  size,
  fontWeight,
  ...props
}: HeadingProps) => {
  const Comp = as ?? "h1";

  return (
    <Comp
      className={twMerge(headingVariants({ className, size, fontWeight }))}
      {...props}
    />
  );
};

export { Heading, type HeadingProps, headingVariants };
