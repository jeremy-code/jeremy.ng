import type { CarouselItemData } from "@/components/Carousel";

const projects = [
  {
    title: "Integra",
    description: "A web app that allows you to learn about your local political officials.",
    tags: ["React", "GraphQL", "MongoDB"],
    links: {
      url: "https://integra.vote/",
      code: "https://github.com/jeremynguyencs/integra",
    },
    image: {
      src: "Integra",
      alt: "Integra screenshot",
    },
  },
  {
    title: "PatientPort",
    description: "React Blockchain web application for managing patient records.",
    tags: ["React", "Solidity", "Ether.js"],
    links: {
      url: "https://www.patientport.tech",
      code: "https://github.com/rishimagiawala/patient-port",
    },
    image: {
      src: "PatientPort",
      alt: "PatientPort screenshot",
    },
  },
  {
    title: "Rhythm Room",
    description:
      "A web app that allows you to listen to music and watch videos synchronously with other people.",
    tags: ["React", "Node", "Socket.io"],
    links: {
      url: "https://rhythmroom.herokuapp.com/",
      code: "https://github.com/sprestrelski/rhythm-room",
    },
    image: {
      src: "RhythmRoom",
      alt: "Rhythm Room screenshot",
    },
  },
  {
    title: "Crypto App",
    description:
      "A web app that allows you to buy and sell cryptocurrencies. You can also view the current price of each cryptocurrency.",
    tags: ["React", "Solidity", "Ether.js"],
    links: {
      url: "https://another-crypto-app.netlify.app/",
      code: "https://github.com/jeremynguyencs/crypto-app",
    },
    image: {
      src: "CryptoApp",
      alt: "Crypto App screenshot",
    },
  },
  {
    title: "Crowdpage",
    description:
      "A social media platform for creating and sharing posts. Users can create posts and like other posts.",
    tags: ["React", "Next.js", "Firebase"],
    links: {
      url: "https://crowdpage.vercel.app",
      code: "https://github.com/jeremynguyencs/crowdpage",
    },
    image: {
      src: "Crowdpage",
      alt: "Crowdpage screenshot",
    },
  },
  {
    title: "COVID-19 Tracker",
    description: "Track the current status of COVID-19 in the world based on current data.",
    tags: ["React", "Chart.js", "API"],
    links: {
      url: "https://covid-tracker-site.netlify.app",
      code: "https://github.com/jeremynguyencs/covid-tracker",
    },
    image: {
      src: "CovidTracker",
      alt: "COVID-19 tracker screenshot",
    },
  },
] satisfies CarouselItemData[];

export default projects;
