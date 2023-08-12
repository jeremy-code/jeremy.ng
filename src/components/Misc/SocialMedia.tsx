"use client";

import React from "react";
import { Flex, Heading, Link, Stack } from "@chakra-ui/react";

import { Icon, iconType } from "@/components/Misc";

type SocialMediaItemProps = {
  icon: iconType;
  href: string;
  handle: string;
};

const SocialMediaItem = ({ icon, href, handle }: SocialMediaItemProps) => {
  return (
    <Flex gap={4} align="center">
      <Icon name={icon} boxSize={6} />
      <Link href={href}>{handle}</Link>
    </Flex>
  );
};

const SocialMediaData = [
  {
    icon: "linkedin",
    href: "linkedin.com/in/jeremynguyendev/",
    handle: "@jeremynguyendev",
  },
  {
    icon: "github",
    href: "https://github.com/jeremy-code",
    handle: "@jeremy-code",
  },
  {
    icon: "email",
    href: "mailto:hi@jeremy.ng",
    handle: "hi@jeremy.ng",
  },
] as const;

const SocialMedia = () => {
  return (
    <Stack h="full" align={[null, null, "center"]}>
      <Heading as="h2" size="md" mb={4}>
        Find me on
      </Heading>
      <Stack gap={6}>
        {SocialMediaData.map((item) => (
          <SocialMediaItem key={item.icon} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default SocialMedia;
