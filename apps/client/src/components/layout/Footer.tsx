import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

export const Footer = ({
  className,
  ...props
}: ComponentPropsWithRef<"footer">) => {
  return (
    <footer
      className={cn("grid place-content-center border-t", className)}
      {...props}
    >
      <div className="container py-4">
        <p>Footer text</p>
      </div>
    </footer>
  );
};
