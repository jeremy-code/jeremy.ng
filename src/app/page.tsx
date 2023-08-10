"use client";

import { Box, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

import { Carousel } from "@/components/Carousel";
import { ContactForm } from "@/components/Contact";
import { Footer, Hero, Section } from "@/components/Layout";
import { Timeline } from "@/components/Misc";
import { DynamicNavbar } from "@/components/Navbar";
import { projectData, timelineData } from "@/data";

const tabs = ["home", "about", "skills", "projects", "contact"];

const Home = () => {
  return (
    <>
      <Box position="relative">
        <Box
          position="absolute"
          insetX={0}
          top={-40}
          zIndex={-10}
          overflow="hidden"
          aria-hidden="true"
          filter="auto"
          blur="10rem"
        >
          <Box
            position="relative"
            left={["calc(50%-11rem)", "calc(50%-30rem)"]}
            aspectRatio="1155/678"
            w={["36.125rem", "72.1875rem"]}
            transform="translateX(-50%) rotate(30deg)"
            clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            bgGradient={useColorModeValue(
              "linear(to-tr, #ff80b5, #9089fc)",
              "linear(to-tr, #4f46e5, #80caff)"
            )}
            opacity={0.3}
          />
        </Box>
        <DynamicNavbar tabs={tabs} />
        <Hero />
      </Box>

      <Section id="about" variant="container">
        <Heading as="h1" size="xl" mb={8}>
          About
        </Heading>
        <Timeline events={timelineData} />
      </Section>

      <Section id="skills" variant="container">
        <Heading as="h1" size="xl" mb={8}>
          Skills
        </Heading>
        Skills
      </Section>

      <Section id="projects" variant="container">
        <Heading as="h1" size="xl" mb={8}>
          Projects
        </Heading>
        <Carousel data={projectData} />
      </Section>

      <Section id="contact" variant="container">
        <Heading as="h1" size="xl" mb={8}>
          Contact
        </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          <ContactForm />
        </SimpleGrid>
      </Section>
      <Footer />
    </>
  );
};

export default Home;
