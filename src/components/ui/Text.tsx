import { forwardRef, useMemo } from "react";

import {
  styled,
  type HTMLStyledProps,
  type StyledComponent,
} from "@/lib/styled/jsx";
import { text, type TextVariantProps } from "@/lib/styled/recipes";

type As = "p" | "span" | "div" | "label" | `h${1 | 2 | 3 | 4 | 5 | 6}`;

export type TextProps = {
  as?: As;
} & TextVariantProps &
  HTMLStyledProps<As>;

export const Text = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => {
  const { as = "p", ...localProps } = props;
  const Dynamic = useMemo(() => styled(as, text) as StyledComponent<As>, [as]);

  return <Dynamic ref={ref} {...localProps} />;
});

Text.displayName = "Text";