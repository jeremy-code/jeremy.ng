"use client";

import { useFormStatus } from "react-dom";

import { Button, Spinner, type ButtonProps } from "@/components/ui";
import { styled } from "@/lib/styled/jsx";

export type SubmitButtonProps = ButtonProps;

const SubmitButtonChildren = styled("div", {
  base: { display: "flex", gap: 2 },
  variants: {
    hidden: {
      true: { visibility: "hidden" },
      false: { visibility: "visible" },
    },
  },
  defaultVariants: { hidden: false },
});

/**
 * Button for forms with Server Actions. Client component to use hook
 * `useFormStatus()`, loads spinner when loading
 */
export const SubmitButton = ({ children, ...rest }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...rest}>
      {/* When pending, hide text and show spinner */}
      <Spinner isLoading={pending} pos="absolute" />
      {/* Text is hidden rather than unmounted to ensure button size remains constant */}
      <SubmitButtonChildren hidden={pending}>{children}</SubmitButtonChildren>
    </Button>
  );
};
