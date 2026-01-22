"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  type ComponentProps,
  type ComponentPropsWithRef,
  type KeyboardEventHandler,
} from "react";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AccessibleIcon, Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn } from "tailwind-variants";

import { Button, type ButtonProps } from "./Button";
import {
  CarouselContext,
  useCarousel,
  type CarouselProps as CarouselPrimitiveProps,
} from "../hooks/useCarousel";
import { useSyncCarouselState } from "../hooks/useSyncCarouselState";

type CarouselProps = ComponentPropsWithRef<"div"> & CarouselPrimitiveProps;

/**
 * Set Carousel.options.align to "start"; otherwise, selection breaks with even
 * number of cards.
 */
const Carousel = ({
  options,
  plugins,
  setApi,
  className,
  ...props
}: CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel(options, plugins);
  const carouselState = useSyncCarouselState(api);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          scrollPrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          scrollNext();
          break;
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);

  const orientation =
    (options?.axis === "x" ? "horizontal"
    : options?.axis === "y" ? "vertical"
    : undefined) ?? "horizontal";

  const carouselContextValue = useMemo(
    () => ({
      carouselRef,
      scrollPrev,
      scrollNext,
      ...carouselState,
    }),
    [carouselRef, scrollPrev, scrollNext, carouselState],
  );

  return (
    <CarouselContext value={carouselContextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(
          "group/carousel grid grid-flow-dense",
          "data-[orientation=horizontal]:grid-cols-[auto_minmax(0,1fr)]",
          "data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]",
          className,
        )}
        role="region"
        aria-roledescription="Carousel"
        data-orientation={orientation}
        {...props}
      />
    </CarouselContext>
  );
};

/**
 * If `CarouselProps.options.axis === "y"```, then <CarouselContent /> must have
 * a predetermined height as pages typically can be infinitely long.
 */
function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  const { carouselRef } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn(
        "overflow-hidden",
        "group-data-[orientation=horizontal]/carousel:col-2",
        "group-data-[orientation=vertical]/carousel:row-2",
      )}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          "group-data-[orientation=horizontal]/carousel:flex-row",
          "group-data-[orientation=vertical]/carousel:flex-col",
          className,
        )}
        role="group"
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      role="listitem"
      className={cn(
        "min-w-0 flex-[0_0_100%]",
        "group-data-[orientation=horizontal]/carousel:px-4",
        "group-data-[orientation=vertical]/carousel:py-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({ className, ...props }: ButtonProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cn(
        "group-data-[orientation=vertical]/carousel:rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <AccessibleIcon.Root label="Previous slide">
        <ArrowLeft />
      </AccessibleIcon.Root>
    </Button>
  );
}

function CarouselNext({ className, ...props }: ButtonProps) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      className={cn(
        "group-data-[orientation=vertical]/carousel:rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <AccessibleIcon.Root label="Next slide">
        <ArrowRight />
      </AccessibleIcon.Root>
    </Button>
  );
}

const CarouselControls = ({
  variant = "outline",
  size = "icon",
  ...props
}: ButtonProps) => {
  return (
    <>
      <div
        className={cn(
          "flex",
          "group-data-[orientation=horizontal]/carousel:col-1 group-data-[orientation=horizontal]/carousel:items-center",
          "group-data-[orientation=vertical]/carousel:row-1 group-data-[orientation=vertical]/carousel:justify-center",
        )}
      >
        <CarouselPrevious variant={variant} size={size} {...props} />
      </div>
      <div
        className={cn(
          "flex",
          "group-data-[orientation=horizontal]/carousel:col-3 group-data-[orientation=horizontal]/carousel:items-center",
          "group-data-[orientation=vertical]/carousel:row-3 group-data-[orientation=vertical]/carousel:justify-center",
        )}
      >
        <CarouselNext variant={variant} size={size} {...props} />
      </div>
    </>
  );
};

export {
  type CarouselProps,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselControls,
};
