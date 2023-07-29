import React, { forwardRef } from "react";
import { Box, Flex, Spacer, Stack, StackProps } from "@chakra-ui/react";

const COLORS = ["red", "yellow", "green"];

const TitleBar = () => (
  <Flex w="full" minH={8} bg="gray.600" align="center" px={3}>
    <Flex gap={2} flex="1">
      {COLORS.map((color) => (
        <Box key={color} bg={`${color}.500`} borderRadius="full" w={3} h={3} />
      ))}
    </Flex>
    jermbot
    <Spacer />
  </Flex>
);

const Terminal = forwardRef<HTMLDivElement, StackProps>(({ children, ...rest }, ref) => (
  <Stack
    minH="md"
    minW="lg"
    userSelect="none"
    overflow="clip"
    borderRadius="xl"
    color="white"
    boxShadow="lg"
    bg="gray.700"
    gap={0}
    ref={ref}
    {...rest}
  >
    <TitleBar />
    <Stack
      fontFamily="ui-monospace, SFMono-Regular, Menlo, Courier New, monospace"
      justify="space-between"
      gap={0}
      p={4}
      h="full"
    >
      {children}
    </Stack>
  </Stack>
));
Terminal.displayName = "Terminal";

export default Terminal;
