"use client";

import { Heading, SimpleGrid } from "@chakra-ui/react";

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
      <DynamicNavbar tabs={tabs} />
      <Hero />

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
