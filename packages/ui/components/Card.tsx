import { type ReactElement } from "react";

import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: "relative flex min-w-0 flex-col overflow-hidden rounded-md border bg-surface wrap-break-word", // div
    body: "flex flex-1 flex-col gap-2 p-(--card-padding)", // div
    header: "flex flex-col gap-1.5 px-(--card-padding) pt-(--card-padding)", // div
    footer:
      "flex items-center justify-end gap-2 px-(--card-padding) pb-(--card-padding)", // div
    title: "text-lg/7 font-semibold", // h2
    description: "text-sm", // p
  },
  variants: {
    size: {
      sm: { base: "[--card-padding:--spacing(4)]" },
      md: { base: "[--card-padding:--spacing(6)]" },
      lg: { base: "[--card-padding:--spacing(7)]" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type CardProps = {
  title?: ReactElement;
  description?: ReactElement;
  footer?: ReactElement;
  header?: ReactElement;
  body?: ReactElement;
} & PrimitivePropsWithRef<"div"> &
  VariantProps<typeof cardVariants>;

function Card({
  asChild,
  className,
  size,
  title,
  description,
  footer,
  header,
  body,
  children,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot.Root : "div";
  const cardStyles = cardVariants({ className, size });

  return (
    <Comp className={cardStyles.base()} {...props}>
      <div className={cardStyles.header()}>
        {!!title && (
          <Slot.Root className={cardStyles.title()}>{title}</Slot.Root>
        )}
        {!!description && (
          <Slot.Root className={cardStyles.description()}>
            {description}
          </Slot.Root>
        )}
        {header}
      </div>
      <Slot.Root className={cardStyles.body()}>{body}</Slot.Root>
      <Slot.Slottable>{children}</Slot.Slottable>
      {!!footer && (
        <Slot.Root className={cardStyles.footer()}>{footer}</Slot.Root>
      )}
    </Comp>
  );
}

export { cardVariants, Card, type CardProps };
