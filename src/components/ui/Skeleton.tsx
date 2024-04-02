import { forwardRef, type ReactNode } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled, type HTMLStyledProps } from "@/lib/styled/jsx";
import { skeleton } from "@/lib/styled/recipes";

const StyledSkeleton = styled(ark.div, skeleton);

export interface SkeletonProps extends HTMLStyledProps<"div"> {
  children?: ReactNode;
  /**
   *
   * @defaultValue false
   */
  isLoaded?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { isLoaded, ...rest } = props;

    if (isLoaded) {
      return <styled.div animation="fade-in" ref={ref} {...rest} />;
    }
    return <StyledSkeleton ref={ref} {...rest} />;
  }
);

Skeleton.displayName = "Skeleton";
