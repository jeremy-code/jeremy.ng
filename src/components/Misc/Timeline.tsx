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
    <Flex gap={4}>
      <Circle size="14" bg={useColorModeValue("white", "gray.800")}>
        <Icon name={icon} boxSize="1.5em" />
      </Circle>
      <Flex pt={4} gap={4} flexDir={["column", null, "row"]}>
        <Box>
          {text}
          <Box fontSize="sm" color={subtitleColor}>
            {subtitle}
          </Box>
        </Box>
        <Text color={subtitleColor}>{date}</Text>
      </Flex>
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
        left: 7,
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
