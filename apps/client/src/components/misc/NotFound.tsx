import { Link, type NotFoundRouteProps } from "@tanstack/react-router";

import { Button } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";

const NotFound = (_props: NotFoundRouteProps) => {
  return (
    <main className="container grid max-h-min grid-cols-1 items-center justify-items-center py-4 sm:grid-cols-2 sm:gap-8">
      <img
        alt="Illustration of a flying saucer beaming up a cyclopean alien while another alien watches from the ground."
        className="h-80 max-sm:justify-self-center sm:h-100 sm:justify-self-end md:h-110 lg:h-125"
        src="/not-found.svg"
      />
      <div className="order-first flex flex-col items-start gap-2 justify-self-start sm:order-last">
        <Heading as="h1" size="3xl">
          Not Found
        </Heading>
        <p className="text-fg-muted mb-4">
          The page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
};
export { NotFound };
