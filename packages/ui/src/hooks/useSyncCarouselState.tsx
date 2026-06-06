"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { type UseEmblaCarouselType } from "embla-carousel-react";

type CarouselState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const useSyncCarouselState = (api: UseEmblaCarouselType[1]) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handler = useEffectEvent(
    (emblaApi: Exclude<UseEmblaCarouselType[1], undefined>) => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    },
  );

  useEffect(() => {
    if (api === undefined) {
      return;
    }

    api.on("init", handler);
    api.on("select", handler);
    api.on("reInit", handler);

    return () => {
      api.off("init", handler);
      api.off("select", handler);
      api.off("reInit", handler);
    };
  }, [api]);

  return {
    canScrollPrev,
    canScrollNext,
  };
};

export { type CarouselState, useSyncCarouselState };
