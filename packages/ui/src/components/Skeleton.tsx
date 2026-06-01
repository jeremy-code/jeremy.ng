import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn } from "tailwind-variants";

type SkeletonProps = PrimitivePropsWithRef<"div">;

const Skeleton = ({ asChild, className, ...props }: SkeletonProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
};

export { Skeleton, type SkeletonProps };
