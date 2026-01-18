import { ThemeToggle } from "#components/misc/ThemeToggle";
import { NpmSearchList } from "#components/npm/NpmSearchList";
import { Button } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";

const Home = () => {
  return (
    <div className="container">
      <Button>Test Button</Button>
      <ThemeToggle variant="secondary" size="icon" />
      <Heading as="h1" size="2xl" className="mb-2">
        NPM Libraries
      </Heading>
      <NpmSearchList />
    </div>
  );
};

export default Home;
