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
      <path
        fill-rule="evenodd"
        fill="currentColor"
        d="M 5,2 H 19 A 3,3 0 0 1 22,5 V 19 A 3,3 0 0 1 19,22 H 5 A 3,3 0 0 1 2,19 V 5 A 3,3 0 0 1 5,2 Z M5.75 5.75H18.25V18.25H15.75V8.25H12V18.25H5.75V5.75Z"
      />
    </svg>
  );
};

export { Npm, type NpmProps };
