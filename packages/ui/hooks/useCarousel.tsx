"use client";

import { createContext, use } from "react";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import type { CarouselState } from "./useSyncCarouselState";

type UseEmblaCarouselParameters = Parameters<typeof useEmblaCarousel>;

type CarouselProps = {
  options?: UseEmblaCarouselParameters[0];
  plugins?: UseEmblaCarouselParameters[1];
  setApi?: (api: UseEmblaCarouselType[1]) => void;
};

type CarouselContext = {
  carouselRef: UseEmblaCarouselType[0];
  scrollPrev: () => void;
  scrollNext: () => void;
} & CarouselState;

const CarouselContext = createContext<CarouselContext | null>(null);

const useCarousel = () => {
  const carouselContext = use(CarouselContext);

  if (!carouselContext) {
    throw new Error("useCarousel must be within a <Carousel /> with a value");
  }

  return carouselContext;
};

export { type CarouselProps, CarouselContext, useCarousel };
