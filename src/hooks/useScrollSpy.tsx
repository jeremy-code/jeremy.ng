"use client";

import { useEffect, useRef } from "react";

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px 100% 0px",
  threshold: Array.from({ length: 11 }, (_, i) => i * 0.1),
};

export type OnScroll = (entry: IntersectionObserverEntry, isInViewport: boolean) => void;

const useScrollSpy = (onScroll?: OnScroll) => {
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const isInViewport = (entry: IntersectionObserverEntry): boolean => {
      const { top, bottom } = entry.boundingClientRect;
      return top <= 0 && bottom >= 0;
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const isInView = isInViewport(entry);
        onScroll && onScroll(entry, isInView);
      });
    };

    scrollObserver.current = new IntersectionObserver(handleIntersect, observerOptions);

    const targets = document.querySelectorAll<HTMLElement>("[data-scrollspy]");
    targets.forEach((target) => scrollObserver.current?.observe(target));

    return () => {
      targets.forEach((target) => scrollObserver.current?.unobserve(target));
      scrollObserver.current?.disconnect();
    };
  }, [onScroll]);

  return;
};

export default useScrollSpy;
