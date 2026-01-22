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
      /**
       * The following comment is a minor fix for a bug in Tailwind CSS's CSS
       * generation when using escaped characters.
       *
       * @see {@link https://github.com/tailwindlabs/tailwindcss/issues/19589 }
       */
      // className="not-last:after:content-['\a0_·_']"
      className={cn(
        "inline not-last:after:font-black not-last:after:content-['\\a0_·_']",
        className,
      )}
      {...props}
    />
  );
};

export { HorizontalList, HorizontalListItem };
