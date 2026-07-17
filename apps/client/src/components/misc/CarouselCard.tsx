import type { ReactNode } from "react";

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
    footer:
      "justify-end border-t bg-gray-100 pt-4 text-[unset] dark:bg-gray-950",
    title: "self-stretch truncate",
    body: "gap-2",
    header: "items-start",
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
      <div className={carouselCardStyles.header()}>{header}</div>
      <div className={carouselCardStyles.body()}>
        <p className={carouselCardStyles.description()}>{description}</p>
      </div>
      <div className={carouselCardStyles.footer()}>{footer}</div>
    </div>
  );
};

export { carouselCardVariants, CarouselCard, type CarouselCardProps };
