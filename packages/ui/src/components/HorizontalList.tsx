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
       * Since JSX strips backslashes in HTML, `String.raw` is necessary for
       * correct CSS output
       *
       * @see {@link https://tailwindcss.com/docs/adding-custom-styles#handling-whitespace}
       */
      className={cn(
        String.raw`inline not-last:after:font-black not-last:after:content-['\a0_·_']`,
        className,
      )}
      {...props}
    />
  );
};

export { HorizontalList, HorizontalListItem };
