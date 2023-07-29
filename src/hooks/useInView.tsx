import { RefObject, useEffect, useState } from "react";

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "24px 0px 0px 0px",
  threshold: 0.5,
};

const useInView = (ref: RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const { current: target } = ref;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, observerOptions);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [ref]);

  return isInView;
};

export default useInView;
