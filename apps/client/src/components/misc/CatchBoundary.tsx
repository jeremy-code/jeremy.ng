import {
  ErrorComponent,
  type ErrorComponentProps,
  rootRouteId,
  useMatch,
} from "@tanstack/react-router";
import { ChevronLeft, TriangleAlert } from "lucide-react";

import { Link } from "#components/common/Link";
import { Button, buttonVariants } from "@jeremyng/ui/components/Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@jeremyng/ui/components/Card";
import { Heading } from "@jeremyng/ui/components/Heading";

const CatchBoundary = ({ error, reset }: ErrorComponentProps) => {
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className="container my-auto">
      <Card>
        <CardHeader>
          <div className="bg-bg-muted grid size-13 place-content-center rounded-lg border">
            <TriangleAlert className="size-8" />
          </div>
          <Heading as="h1" size="2xl">
            An error occurred!
          </Heading>
          <p>An unexpected error occurred while the application was running.</p>
        </CardHeader>
        <CardBody>
          <div className="rounded-md border bg-muted">
            <ErrorComponent error={error} />
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="surface" onClick={() => reset()}>
            Try Again
          </Button>
          {isRoot ?
            <Link
              to="/"
              className={buttonVariants({
                variant: "solid",
              })}
            >
              Home
            </Link>
          : <Button variant="solid" onClick={() => window.history.back()}>
              <ChevronLeft size={16} />
              Go Back
            </Button>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export { CatchBoundary };
