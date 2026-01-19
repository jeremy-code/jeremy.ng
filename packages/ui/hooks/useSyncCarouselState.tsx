"use client";

import { useCallback, useSyncExternalStore } from "react";

import { type UseEmblaCarouselType } from "embla-carousel-react";

type CarouselState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const useSyncCarouselState = (api: UseEmblaCarouselType[1]) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (api === undefined) {
        return () => {};
      }

      api.on("select", onStoreChange);
      api.on("reInit", onStoreChange);
      return () => {
        api.off("select", onStoreChange);
        api.off("reInit", onStoreChange);
      };
    },
    [api],
  );

  // Not memoizing `getSnapshot()` functions, https://github.com/pmndrs/zustand/discussions/971
  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    /**
     * Having an undefined `getServerSnapshot()` gives the follow error in
     * Next.js: "Missing getServerSnapshot, which is required for
     * server-rendered content. Will revert to client rendering."
     */
    () => false,
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false,
  );

  return {
    canScrollPrev,
    canScrollNext,
  };
};

export { type CarouselState, useSyncCarouselState };
