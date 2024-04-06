"use client";

import { Button, Code, Collapsible, Heading, Text } from "@/components/ui";
import { css, cx } from "@/lib/styled/css";
import { Flex } from "@/lib/styled/jsx";
import { container } from "@/lib/styled/patterns";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <main
      className={cx(
        container(),
        css({
          width: "full",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: { base: 4, md: 6, lg: 8 },
        })
      )}
    >
      <Heading size="xl">
        <Text as="span" fontWeight="bold">
          {error.name}
        </Text>
        : Something went wrong!
      </Heading>

      <Collapsible.Root>
        <Flex gap={2}>
          <Button onClick={() => reset()}>Try again</Button>
          <Collapsible.Trigger asChild>
            <Button variant="outline">View Error</Button>
          </Collapsible.Trigger>
        </Flex>
        <Collapsible.Content>
          <Code mt={2}>{error.message}</Code>
        </Collapsible.Content>
      </Collapsible.Root>
    </main>
  );
};

export default Error;
