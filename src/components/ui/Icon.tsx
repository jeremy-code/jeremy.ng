import { forwardRef, type ReactElement } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled, type HTMLStyledProps } from "@/lib/styled/jsx";
import { icon, type IconVariantProps } from "@/lib/styled/recipes";

export interface IconProps extends IconVariantProps, HTMLStyledProps<"svg"> {
  children: ReactElement;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return <StyledIcon ref={ref} asChild {...props} />;
});

Icon.displayName = "Icon";

const StyledIcon = styled(ark.svg, icon);
