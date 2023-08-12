import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { motion, ResolvedValues, useMotionValue, useScroll } from "framer-motion";

import { ScrollIndicator } from "@/components/Carousel";
import { useWindowSize } from "@/hooks";
import { debounce } from "@/utils";

const MotionBox = motion(Box);

type ContentSliderProps = {
  children: ReactNode;
} & BoxProps;

const ContentSlider = ({ children, ...rest }: ContentSliderProps) => {
  const [constraintLeft, setConstraintLeft] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const scrollPercentage = useMotionValue(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const handleResize = debounce(() => {
      if (!ref.current) return;
      const { scrollWidth, clientWidth } = ref.current;

      setConstraintLeft(clientWidth - scrollWidth);
    }, 500);

    handleResize();
  }, [windowSize]);

  const getScrollPercentage = useCallback(
    ({ x }: ResolvedValues) => {
      if (!ref.current) return;
      const { scrollWidth, offsetWidth } = ref.current;
      const currPercentage = parseInt(x as string) / (offsetWidth - scrollWidth);

      // Set scroll percentage between 0 and 1
      scrollPercentage.set(Math.min(Math.max(currPercentage, 0), 1));
    },
    [scrollPercentage]
  );

  return (
    <Box overflowX="hidden">
      <MotionBox
        display="flex"
        gap={2}
        cursor="grab"
        mb={8}
        ref={ref}
        drag="x"
        dragConstraints={{ right: 0, left: constraintLeft }}
        onUpdate={getScrollPercentage}
        {...rest}
      >
        {children}
      </MotionBox>
      <ScrollIndicator scrollPercentage={scrollPercentage} />
    </Box>
  );
};

export default ContentSlider;
