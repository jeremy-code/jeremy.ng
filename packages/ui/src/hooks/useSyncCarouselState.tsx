import { useEffect, useEffectEvent, useState } from "react";

import type { EmblaCarouselType } from "embla-carousel";

type CarouselState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const useSyncCarouselState = (api: EmblaCarouselType | undefined) => {
  const [canScrollPrev, setCanScrollPrev] = useState(() =>
    api?.canScrollPrev(),
  );
  const [canScrollNext, setCanScrollNext] = useState(() =>
    api?.canScrollPrev(),
  );

  const [prevApi, setPrevApi] = useState(api);
  if (api !== prevApi) {
    setPrevApi(api);
    setCanScrollNext(api?.canScrollNext());
    setCanScrollPrev(api?.canScrollPrev());
  }

  const handler = useEffectEvent((emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  });

  useEffect(() => {
    if (api === undefined) {
      return;
    }

    api.on("select", handler);
    api.on("reInit", handler);

    return () => {
      api.off("select", handler);
      api.off("reInit", handler);
    };
  }, [api]);

  return {
    canScrollPrev: canScrollPrev ?? false,
    canScrollNext: canScrollNext ?? false,
  };
};

export { type CarouselState, useSyncCarouselState };
