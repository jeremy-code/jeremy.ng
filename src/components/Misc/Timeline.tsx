"use client";

import { Box, Circle, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import { Icon, iconType } from "@/components/Misc";

export type Event = {
  icon: iconType;
  text: string;
  subtitle?: string;
  date: string;
};

type TimelineItemProps = Event;

const TimelineItem = ({ icon, text, subtitle, date }: TimelineItemProps) => {
  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex align="center" gap={4}>
      <Circle size="10" bg={useColorModeValue("white", "gray.800")}>
        <Icon name={icon} />
      </Circle>
      <Box position="relative">
        {text}
        {subtitle && (
          <Box position="absolute" top="100%" whiteSpace="nowrap" color={subtitleColor}>
            {subtitle}
          </Box>
        )}
      </Box>
      <Text fontSize="sm" color={subtitleColor}>
        {date}
      </Text>
    </Flex>
  );
};

type TimelineProps = {
  events: Event[];
};

export const Timeline = ({ events }: TimelineProps) => {
  return (
    <Stack
      spacing={12}
      position="relative"
      _after={{
        content: '""',
        w: "1px",
        bgColor: useColorModeValue("gray.300", "gray.500"),
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 5,
        zIndex: -1,
      }}
    >
      {events.map(({ icon, text, subtitle, date }, i) => (
        <TimelineItem
          key={`${text}-${i}`}
          icon={icon}
          text={text}
          subtitle={subtitle}
          date={date}
        />
      ))}
    </Stack>
  );
};
