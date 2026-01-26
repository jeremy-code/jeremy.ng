import { type ReactNode } from "react";

import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: "relative flex min-w-0 flex-col overflow-hidden rounded-md border bg-surface wrap-break-word", // div
    body: "flex flex-1 flex-col gap-2 p-[--card-padding]", // div
    header: "flex flex-col gap-1.5", // div
    footer: "flex items-center justify-end gap-2", // div
    title: "text-lg/7 font-semibold", // h2
    description: "text-sm", // p
  },
  variants: {
    size: {
      custom: {
        body: "p-[--card-padding]",
        header: "px-[--card-padding] pt-[--card-padding]",
        footer: "px-[--card-padding] pb-[--card-padding]",
      },
      sm: {
        body: "p-4",
        header: "px-4 pt-4",
        footer: "px-4 pb-4",
      },
      md: {
        body: "p-6",
        header: "px-6 pt-6",
        footer: "px-6 pb-6",
      },
      lg: {
        body: "p-7",
        header: "px-7 pt-7",
        footer: "px-7 pb-7",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type CardProps = PrimitivePropsWithRef<"div"> &
  VariantProps<typeof cardVariants>;

function Card({
  className,
  asChild,
  size,
  title,
  description,
  footer,
  header,
  body,
  children,
  ...props
}: CardProps & {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
}) {
  const Comp = asChild ? Slot.Root : "div";
  const cardStyles = cardVariants({
    className,
    size,
  });

  return (
    <Comp className={cn(className, cardStyles.base())} {...props}>
      <div className={cardStyles.header()}>
        {!!title && <h2 className={cardStyles.title()}>{title}</h2>}
        {!!description && (
          <h2 className={cardStyles.description()}>{description}</h2>
        )}
        {header}
      </div>
      <div className={cardStyles.body()}>
        {body}
        {children}
      </div>
      {!!footer && <div className={cardStyles.footer()}>{footer}</div>}
    </Comp>
  );
}

export { cardVariants, Card, type CardProps };
