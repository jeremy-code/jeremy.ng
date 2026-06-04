import {
  ErrorComponent,
  type ErrorComponentProps,
  Link as RouterLink,
  rootRouteId,
  useMatch,
} from "@tanstack/react-router";
import { ChevronLeft, TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "@jeremyng/ui/components/Button";
import { Card } from "@jeremyng/ui/components/Card";
import { Heading } from "@jeremyng/ui/components/Heading";
import { Link } from "@jeremyng/ui/components/Link";

const CatchBoundary = ({ error, reset }: ErrorComponentProps) => {
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className="container my-auto">
      <Card
        header={
          <>
            <div className="bg-bg-muted grid size-13 place-content-center rounded-lg border">
              <TriangleAlert className="size-8" />
            </div>
            <Heading as="h1" size="2xl">
              An error occurred!
            </Heading>
            <p>
              An unexpected error occurred while the application was running.
            </p>
          </>
        }
        body={
          <div>
            <div className="rounded-md border bg-muted">
              <ErrorComponent error={error} />
            </div>
          </div>
        }
        footer={
          <div>
            <Button variant="surface" onClick={() => reset()}>
              Try Again
            </Button>
            {isRoot ?
              <Link asChild>
                <RouterLink
                  to="/"
                  className={buttonVariants({
                    variant: "solid",
                  })}
                />
                Home
              </Link>
            : <Button variant="solid" onClick={() => window.history.back()}>
                <ChevronLeft size={16} />
                Go Back
              </Button>
            }
          </div>
        }
      />
    </div>
  );
};

export { CatchBoundary };
