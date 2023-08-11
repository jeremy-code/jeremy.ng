import React from "react";
import { Link } from "@chakra-ui/next-js";
import { Center, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Center
      as="footer"
      py={6}
      mt={4}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderTopWidth={1}
    >
      <Text>
        {"Made with "}
        <span role="img" aria-label="love">
          🧋
        </span>
        {" by "}
        <Link href="/" color={useColorModeValue("primary.500", "primary.200")}>
          Jeremy Nguyen
        </Link>
      </Text>
    </Center>
  );
};

export default Footer;
