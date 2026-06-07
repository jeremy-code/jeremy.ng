import type { ComponentPropsWithRef } from "react";

type NpmProps = ComponentPropsWithRef<"svg">;

/**
 * Logo downloaded from https://github.com/npm/logos/tree/master and resized,
 * arranged similar to Lucide icons
 */
const Npm = (props: NpmProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="3"
        ry="3"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M5.75 5.75H18.25V18.25H15.75V8.25H12V18.25H5.75V5.75Z"
        fill="var(--color-npm-foreground, white)"
        stroke="none"
      />
    </svg>
  );
};

export { Npm, type NpmProps };
