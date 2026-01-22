import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

const HorizontalList = ({
  className,
  ...props
}: ComponentPropsWithRef<"ul">) => {
  return <ul className={cn("inline-block list-none", className)} {...props} />;
};

const HorizontalListItem = ({
  className,
  ...props
}: ComponentPropsWithRef<"li">) => {
  return (
    <li
      className={cn(
        "inline not-last:after:font-black not-last:after:content-['\\a0_·_']",
        className,
      )}
      {...props}
    />
  );
};

export { HorizontalList, HorizontalListItem };
