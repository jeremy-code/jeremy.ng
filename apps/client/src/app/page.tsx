import { ThemeToggle } from "#components/misc/ThemeToggle";
import { Button } from "@jeremyng/ui/components/Button";

const Home = () => {
  return (
    <div className="container">
      Welcome
      <Button>Test Button</Button>
      <ThemeToggle variant="secondary" size="icon" />
    </div>
  );
};

export default Home;
