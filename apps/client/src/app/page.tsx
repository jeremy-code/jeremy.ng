import { ThemeToggle } from "#components/misc/ThemeToggle";
import { NpmSearchList } from "#components/npm/NpmSearchList";
import { Button } from "@jeremyng/ui/components/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselControls,
} from "@jeremyng/ui/components/Carousel";
import { Heading } from "@jeremyng/ui/components/Heading";

const Home = () => {
  return (
    <div className="container">
      <Button>Test Button</Button>
      <ThemeToggle variant="secondary" size="icon" />
      <Carousel>
        <CarouselControls />
        <CarouselContent>
          {Array.from({ length: 5 }, (v, index) => index + 1).map((value) => (
            <CarouselItem key={value}>{value}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Heading as="h1" size="2xl" className="mb-2">
        NPM Libraries
      </Heading>
      <NpmSearchList />
    </div>
  );
};

export default Home;
