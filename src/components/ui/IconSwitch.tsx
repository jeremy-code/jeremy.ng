import { forwardRef, type ReactNode } from "react";
import {
  Switch as ArkSwitch,
  type SwitchRootProps,
} from "@ark-ui/react/switch";

import { css, cx } from "@/lib/styled/css";
import { splitCssProps } from "@/lib/styled/jsx";
import { iconSwitch, type IconSwitchVariantProps } from "@/lib/styled/recipes";
import type { Assign, JsxStyleProps } from "@/lib/styled/types";

export interface IconSwitchProps
  extends Assign<JsxStyleProps, SwitchRootProps>,
    IconSwitchVariantProps {
  children?: ReactNode;
  icon?: ReactNode;
}

export const IconSwitch = forwardRef<HTMLLabelElement, IconSwitchProps>(
  (props, ref) => {
    const [variantProps, switchProps] = iconSwitch.splitVariantProps(props);
    const [cssProps, localProps] = splitCssProps(switchProps);
    const { children, className, icon, ...rootProps } = localProps;
    const styles = iconSwitch(variantProps);

    return (
      <ArkSwitch.Root
        ref={ref}
        className={cx(styles.root, css(cssProps), className)}
        {...rootProps}
      >
        <ArkSwitch.Control className={styles.control}>
          <ArkSwitch.Thumb className={styles.thumb}>{icon}</ArkSwitch.Thumb>
        </ArkSwitch.Control>
        {children && (
          <ArkSwitch.Label className={styles.label}>{children}</ArkSwitch.Label>
        )}
      </ArkSwitch.Root>
    );
  }
);

IconSwitch.displayName = "IconSwitch";
