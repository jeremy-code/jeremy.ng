import { createContext, use } from "react";

import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";
import type { EmblaViewportRefType } from "embla-carousel-react";

import type { CarouselState } from "./useSyncCarouselState";

type CarouselProps = {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  setApi?: (api: EmblaCarouselType | undefined) => void;
};

type CarouselContext = {
  carouselRef: EmblaViewportRefType;
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
