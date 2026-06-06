import type { ComponentPropsWithRef } from "react";

type LinkedInProps = ComponentPropsWithRef<"svg">;

/**
 * Logo downloaded from
 * https://github.com/lucide-icons/lucide/tree/33bb95edcd08545b827ebaca36b60ee77c40db78/icons/linkedin.svg
 * using fill to match the other icons
 */
const LinkedIn = (props: LinkedInProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
};

export { LinkedIn, type LinkedInProps };
