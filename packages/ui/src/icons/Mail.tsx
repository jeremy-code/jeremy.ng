import type { ComponentPropsWithRef } from "react";

type MailProps = ComponentPropsWithRef<"svg">;

/**
 * Logo downloaded from https://lucide.dev/icons/mail but edited to be filled in
 * instead of having a stroke to closer resemble the other social media icons
 */
const Mail = (props: MailProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M 4 3 C 2.603 3 1.435 3.946 1.098 5.234 L 11.506 11.863 C 11.816 12.042 12.192 12.042 12.502 11.863 L 22.902 5.236 C 22.566 3.947 21.398 3 20 3 L 4 3 z M 1 7.543 L 1 18 C 1 19.662 2.338 21 4 21 L 20 21 C 21.662 21 23 19.662 23 18 L 23 7.547 L 13.547 13.570 A 1 1 0 0 1 13.512 13.592 C 12.581 14.133 11.428 14.133 10.498 13.592 A 1 1 0 0 1 10.463 13.570 L 1 7.543 z" />
    </svg>
  );
};

export { Mail, type MailProps };
