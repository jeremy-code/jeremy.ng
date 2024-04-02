import { forwardRef, useMemo } from "react";

import {
  styled,
  type HTMLStyledProps,
  type StyledComponent,
} from "@/lib/styled/jsx";
import { text, type TextVariantProps } from "@/lib/styled/recipes";

type As = `h${1 | 2 | 3 | 4 | 5 | 6}`;

export type HeadingProps = {
  as?: As;
} & TextVariantProps &
  HTMLStyledProps<As>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { as = "h2", ...localProps } = props;
    const Dynamic = useMemo(
      () => styled(as, text) as StyledComponent<As>,
      [as]
    );

    return <Dynamic ref={ref} {...localProps} />;
  }
);

Heading.displayName = "Heading";
