import { ThemeToggle } from "#components/misc/ThemeToggle";
import { helpers } from "#lib/trpc/server";
import { Button } from "@jeremyng/ui/components/Button";

import { UserList } from "./_components/ClientComponent";

const Home = () => {
  void helpers.hello.prefetch({ text: "Bilbo" });

  return (
    <div className="container">
      Welcome
      <Button>Test Button</Button>
      <ThemeToggle variant="secondary" size="icon" />
      <UserList />
    </div>
  );
};

export default Home;
