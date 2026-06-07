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
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <title>LinkedIn logo</title>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <path
        // It seems that the LinkedIn "square" is for some reason 21.1x21px, hence
        // the strange values
        d="M8.15232 19H5.27815V9.66667H8.15232V19ZM6.66887 8.36C5.74172 8.36 5 7.61333 5 6.68C5 5.74667 5.74172 5 6.66887 5C7.59603 5 8.33775 5.74667 8.33775 6.68C8.33775 7.61333 7.59603 8.36 6.66887 8.36ZM19 19H16.1258V14.4267C16.1258 13.3067 16.1258 11.9067 14.6424 11.9067C13.1589 11.9067 12.8808 13.12 12.8808 14.3333V19H10.0066V9.66667H12.7881V10.9733C13.3444 10.04 14.3642 9.38667 15.4768 9.48C18.4437 9.48 18.9073 11.44 18.9073 13.96L19 19Z"
        fill="var(--color-linkedin-foreground, white)"
      />
    </svg>
  );
};

export { LinkedIn, type LinkedInProps };
