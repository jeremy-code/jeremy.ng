import type { ComponentPropsWithRef } from "react";

type LinkedInProps = ComponentPropsWithRef<"svg">;

/**
 * Logo downloaded from https://brand.linkedin.com/downloads and resized,
 * arranged similar to Lucide icons
 */
const LinkedIn = (props: LinkedInProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 33.6 33.6"
      fill="currentColor"
      {...props}
    >
      <title>LinkedIn logo</title>
      <path
        fill-rule="evenodd"
        fill="currentColor"
        d="M 7,2.8 H 26.6 A 4.2,4.2 0 0 1 30.8,7 V 26.6 A 4.2,4.2 0 0 1 26.6,30.8 H 7 A 4.2,4.2 0 0 1 2.8,26.6 V 7 A 4.2,4.2 0 0 1 7,2.8 Z M 11.05,26.7 H 6.95 V 13.3 h 4.2 V 26.7 Z M 8.95,11.5 c -1.3,0 -2.4,-1.1 -2.4,-2.4 0,-1.3 1.1,-2.4 2.4,-2.4 1.3,0 2.4,1.1 2.4,2.4 0,1.3 -1,2.4 -2.4,2.4 z m 17.7,15.2 h -4.1 v -6.5 c 0,-1.5 0,-3.5 -2.2,-3.5 -2.2,0 -2.5,1.7 -2.5,3.4 v 6.6 h -4.1 V 13.3 h 4 v 1.8 h 0.1 c 0.6,-1 1.9,-2.2 3.9,-2.2 4.2,0 5,2.8 5,6.4 v 7.4 z"
      />
    </svg>
  );
};

export { LinkedIn, type LinkedInProps };
