import type { ComponentPropsWithRef } from "react";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const switchVariants = tv({
  slots: {
    root: "box-content inline-flex shrink-0 justify-start gap-0.5 rounded-full border transition-colors",
    thumb: [
      "flex shrink-0 scale-[0.8] items-center justify-center rounded-[inherit] transition-[translate,background-color]",
      "data-checked:translate-x-full data-unchecked:translate-x-0",
    ],
  },
  variants: {
    color: {
      blue: {
        root: [
          "data-unchecked:border-border data-unchecked:bg-gray-200 data-unchecked:hover:border-subtle-foreground data-unchecked:dark:bg-gray-800",
          "data-checked:border-blue-600 data-checked:bg-blue-600 data-checked:hover:border-blue-700",
        ],
        thumb: "data-checked:bg-blue-50 data-unchecked:bg-gray-50",
      },
      gray: {
        root: "border-border bg-gray-200 hover:border-subtle-foreground dark:bg-gray-800",
        thumb: "bg-gray-50",
      },
    },
    size: {
      sm: {
        root: "h-3 w-6",
        thumb: "size-3",
      },
      md: {
        root: "h-4 w-8",
        thumb: "size-4",
      },
      lg: {
        root: "h-5 w-10",
        thumb: "size-5",
      },
      xl: {
        root: "h-6 w-12",
        thumb: "size-6",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "gray",
  },
});

type SwitchRootProps = ComponentPropsWithRef<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>;

const SwitchRoot = ({ size, color, ...props }: SwitchRootProps) => {
  return (
    <SwitchPrimitive.Root
      {...props}
      className={composeRenderProps(props.className, (className) =>
        switchVariants().root({ className, size, color }),
      )}
    />
  );
};

type SwitchThumbProps = ComponentPropsWithRef<typeof SwitchPrimitive.Thumb> &
  VariantProps<typeof switchVariants>;

const SwitchThumb = ({ size, color, ...props }: SwitchThumbProps) => {
  return (
    <SwitchPrimitive.Thumb
      {...props}
      className={composeRenderProps(props.className, (className) =>
        switchVariants().thumb({ className, size, color }),
      )}
    />
  );
};

type SwitchProps = {
  switchThumbProps?: SwitchThumbProps;
} & SwitchRootProps;

const Switch = ({
  switchThumbProps,
  size,
  children,
  color,
  ...props
}: SwitchProps) => {
  return (
    <SwitchRoot size={size} color={color} {...props}>
      <SwitchThumb size={size} color={color} {...switchThumbProps} />
      {children}
    </SwitchRoot>
  );
};

export {
  Switch,
  type SwitchProps,
  switchVariants,
  SwitchRoot,
  type SwitchRootProps,
  SwitchThumb,
  type SwitchThumbProps,
};
