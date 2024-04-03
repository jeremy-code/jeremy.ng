import { Presence } from "@ark-ui/react";

import { Circle, type CircleProps } from "@/lib/styled/jsx";

export type SpinnerProps = {
  isLoading?: boolean;
} & CircleProps;

export const Spinner = ({ isLoading = true, ...props }: SpinnerProps) => {
  return (
    <Presence present={isLoading} asChild>
      <Circle
        border="4px solid token(colors.gray.4)"
        borderTopColor="colorPalette.8"
        // size 6 = 1.5rem = 24px, change height/width with size prop
        size="6"
        animation="spin"
        data-scope="progress"
        role="progressbar"
        aria-label="loading..."
        data-state="indeterminate"
        {...props}
      />
    </Presence>
  );
};
