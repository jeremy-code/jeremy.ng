import type { ComponentPropsWithRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { cn } from "tailwind-variants";

import { useTRPC } from "#lib/trpc/client";
import { env } from "#utils/env";
import { buttonVariants } from "@jeremyng/ui/components/Button";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

type HeroProps = ComponentPropsWithRef<"section">;

const Hero = ({ className, ...props }: HeroProps) => {
  const {
    isPending,
    isError,
    data: bio,
    error,
  } = useQuery(
    useTRPC().github.getBio.queryOptions({
      login: env.VITE_GITHUB_USERNAME,
    }),
  );

  if (isError) {
    console.error(error);
  }

  return (
    <section
      className={cn("flex flex-col items-center gap-8 py-20", className)}
      {...props}
    >
      {isPending ?
        <Skeleton className="h-10 w-full" />
      : <h1 className="text-center text-4xl font-semibold tracking-tight text-balance">
          {isError ?
            "An error occurred while fetching from GitHub"
          : (bio ?? "No bio was found")}
        </h1>
      }
      <div className="flex gap-2" role="group">
        <a
          href="/resume.pdf"
          target="_blank"
          className={buttonVariants({ variant: "surface", color: "primary" })}
        >
          Résumé
        </a>
        <a
          href="#contact"
          className={buttonVariants({ variant: "ghost", color: "gray" })}
        >
          Contact
        </a>
      </div>
    </section>
  );
};

export { Hero, type HeroProps };
