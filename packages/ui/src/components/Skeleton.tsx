import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

type SkeletonProps = ComponentPropsWithRef<"div">;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
};

export { Skeleton, type SkeletonProps };
