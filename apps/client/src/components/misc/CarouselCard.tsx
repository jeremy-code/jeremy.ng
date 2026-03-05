import type { ReactNode } from "react";

import { Slot } from "radix-ui";
import { tv } from "tailwind-variants";

import { cardVariants, type CardProps } from "@jeremyng/ui/components/Card";

type CarouselCardProps = {
  header: ReactNode;
  description: ReactNode;
  footer: ReactNode;
} & CardProps;

const carouselCardVariants = tv({
  extend: cardVariants,
  slots: {
    base: "h-full",
    footer: "border-t bg-surface-darker pt-4",
    title: "truncate",
    description: "line-clamp-3",
  },
});

const CarouselCard = ({
  header,
  description,
  footer,
  className,
  size,
  ...props
}: CarouselCardProps) => {
  const carouselCardStyles = carouselCardVariants({ className, size });

  return (
    <div className={carouselCardStyles.base()} {...props}>
      <Slot.Root className={carouselCardStyles.header()}>{header}</Slot.Root>
      <div className={carouselCardStyles.body()}>
        <Slot.Root className={carouselCardStyles.description()}>
          {description}
        </Slot.Root>
      </div>
      <Slot.Root className={carouselCardStyles.footer()}>{footer}</Slot.Root>
    </div>
  );
};

export { carouselCardVariants, CarouselCard, type CarouselCardProps };
