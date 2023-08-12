import { Image } from "@chakra-ui/next-js";
import {
  Button,
  ButtonGroup,
  Container,
  ContainerProps,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavLink } from "@/components/Navbar";
import { Terminal } from "@/components/Terminal";
import { nikeLogo } from "@/assets";

const Hero = (props: ContainerProps) => {
  return (
    <Container py={20} {...props}>
      <SimpleGrid columns={[1, null, 2]} h="full">
        <Stack justify="center" gap={16}>
          <Stack gap={4}>
            <Heading size="4xl" lineHeight="1.15em">
              Hi, I&apos;m {""}
              <Text as="span" variant="highlight">
                Jeremy
              </Text>{" "}
            </Heading>

            <Heading as="h2" size="md" fontWeight="normal">
              Software Engineering Intern @{" "}
              <a href="https://www.nike.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src={nikeLogo}
                  display="inline"
                  verticalAlign="middle"
                  w={12}
                  alt="Nike"
                  filter={useColorModeValue("invert(0)", "invert(1)")}
                />
              </a>
            </Heading>
          </Stack>

          <ButtonGroup>
            <NavLink href="projects">
              <Button size="lg">See my Projects</Button>
            </NavLink>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" color={useColorModeValue("gray.800", "white")}>
                Resume
              </Button>
            </a>
          </ButtonGroup>
        </Stack>
        <Stack justify="center" display={["none", null, "flex"]}>
          <Terminal />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Hero;
