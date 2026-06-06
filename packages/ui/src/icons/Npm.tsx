import type { ComponentPropsWithRef } from "react";

type NpmProps = ComponentPropsWithRef<"svg">;

/**
 * Logo downloaded from
 * https://github.com/simple-icons/simple-icons/blob/8581258020405f5837a25db5e54f180ca077b7c1/icons/npm.svg
 * and resized, arranged similar to Lucide icons
 */
const Npm = (props: NpmProps) => {
  return (
    //
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M3.46917 2C2.655 2 2 2.655 2 3.46917V20.5308C2 21.345 2.655 22 3.46917 22H20.5308C21.345 22 22 21.345 22 20.5308V3.46917C22 2.655 21.345 2 20.5308 2H3.46917ZM6.275 6.43583L17.8058 6.45167L17.7983 17.9817H14.9117L14.92 9.33H12.04L12.0333 17.975H6.26083L6.275 6.43583Z" />
    </svg>
  );
};

export { Npm, type NpmProps };
