import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Image } from "#components/common/Image";
import { Button } from "@jeremyng/ui/components/Button";
import { Heading } from "@jeremyng/ui/components/Heading";

const NotFound = (props: NotFoundRouteProps) => {
  console.warn(
    `Route ${props.routeId} was ${props.isNotFound ? "not found" : "found"} with data ${JSON.stringify(props.data)}`,
  );

  return (
    <main className="container flex flex-col justify-center gap-8 py-4">
      <Image
        alt="Illustration of a flying saucer beaming up a cyclopean alien while another alien watches from the ground."
        className="mx-auto max-w-[min(100%,var(--container-md))]"
        src="/assets/not-found.webp"
        layout="fullWidth"
        priority
      />
      <div className="flex flex-col items-start justify-center gap-2 sm:items-center">
        <Heading as="h1" size="4xl">
          Not Found
        </Heading>
        <p className="text-fg-muted mb-4">
          The page you are looking for does not exist.
        </p>
        <div role="group" className="flex gap-2">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button variant="solid" onClick={() => window.history.back()}>
            <ChevronLeft size={16} />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};
export { NotFound };
