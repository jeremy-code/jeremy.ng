import { createContext, use } from "react";

import type { EmblaViewportRefType } from "embla-carousel-react";

import type { CarouselState } from "./useSyncCarouselState";

type CarouselContextValue = {
  carouselRef: EmblaViewportRefType;
  scrollPrev: () => void;
  scrollNext: () => void;
} & CarouselState;

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarouselContext = () => {
  const carouselContext = use(CarouselContext);

  if (carouselContext === null) {
    throw new Error("useCarousel must be within a <Carousel /> with a value");
  }

  return carouselContext;
};

export { CarouselContext, type CarouselContextValue, useCarouselContext };
