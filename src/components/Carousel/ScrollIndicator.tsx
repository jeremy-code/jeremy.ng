import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion, MotionValue, useTransform } from "framer-motion";

type ScrollIndicatorProps = {
  scrollPercentage: MotionValue<number>;
};

const MotionBox = motion(Box);

const ScrollIndicator = ({ scrollPercentage }: ScrollIndicatorProps) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const progressColor = useColorModeValue("primary.500", "primary.300");

  const width = useTransform(scrollPercentage, [0, 1], ["0%", "100%"]);

  return (
    <Box bg={bgColor} h="4px" w="full">
      <MotionBox bg={progressColor} h="4px" style={{ width }} />
    </Box>
  );
};

export default ScrollIndicator;
