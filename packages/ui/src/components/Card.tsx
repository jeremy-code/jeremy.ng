import type { ComponentPropsWithRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

// Context is not used as the only styles that change with the different
// variants are the base styles
const cardVariants = tv({
  slots: {
    base: "relative flex min-w-0 flex-col overflow-hidden rounded-md wrap-break-word",
    body: "flex flex-1 flex-col p-(--card-padding)",
    header: "flex flex-col gap-1.5 px-(--card-padding) pt-(--card-padding)",
    footer: "flex items-center gap-2 px-(--card-padding) pb-(--card-padding)",
    title: "text-(size:--card-title-font-size)/6 font-semibold",
    description: "text-sm text-muted-foreground",
  },
  variants: {
    size: {
      sm: {
        base: "[--card-padding:--spacing(4)] [--card-title-font-size:var(--text-md)]",
      },
      md: {
        base: "[--card-padding:--spacing(6)] [--card-title-font-size:var(--text-lg)]",
      },
      lg: {
        base: "[--card-padding:--spacing(7)] [--card-title-font-size:var(--text-lg)]",
      },
    },
    variant: {
      elevated: {
        base: "bg-surface shadow-md",
      },
      outline: {
        base: "border border-border bg-surface",
      },
      subtle: {
        base: "bg-muted",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "outline",
  },
});

type CardProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof cardVariants>;

const Card = ({ className, size, variant, ...props }: CardProps) => {
  return (
    <div
      className={cardVariants().base({ size, variant, className })}
      {...props}
    ></div>
  );
};

type CardBodyProps = ComponentPropsWithRef<"div">;

const CardBody = ({ className, ...props }: CardBodyProps) => {
  return <div className={cardVariants().body({ className })} {...props}></div>;
};

type CardHeaderProps = ComponentPropsWithRef<"div">;

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div className={cardVariants().header({ className })} {...props}></div>
  );
};

type CardFooterProps = ComponentPropsWithRef<"div">;

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div className={cardVariants().footer({ className })} {...props}></div>
  );
};

type CardTitleProps = ComponentPropsWithRef<"div">;

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return <h2 className={cardVariants().title({ className })} {...props}></h2>;
};

type CardDescriptionProps = ComponentPropsWithRef<"p">;

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <p className={cardVariants().description({ className })} {...props}></p>
  );
};

export {
  Card,
  type CardProps,
  cardVariants,
  CardBody,
  type CardBodyProps,
  CardHeader,
  type CardHeaderProps,
  CardFooter,
  type CardFooterProps,
  CardTitle,
  type CardTitleProps,
  CardDescription,
  type CardDescriptionProps,
};
