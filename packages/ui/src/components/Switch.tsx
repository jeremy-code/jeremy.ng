import type { ComponentPropsWithRef } from "react";

import { Switch as SwitchPrimitive } from "radix-ui";
import { tv, type VariantProps } from "tailwind-variants";

const switchRootVariants = tv({
  base: [
    "group/switch",
    "relative inline-flex shrink-0 cursor-pointer justify-start gap-2 rounded-full ring-1 transition-[background-color,box-shadow,opacity] ring-inset",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "h-(--switch-height) w-(--switch-width)",
  ],
  variants: {
    size: {
      xs: "[--switch-height:--spacing(3)] [--switch-width:--spacing(6)]",
      sm: "[--switch-height:--spacing(4)] [--switch-width:--spacing(8)]",
      md: "[--switch-height:--spacing(5)] [--switch-width:--spacing(10)]",
      lg: "[--switch-height:--spacing(7)] [--switch-width:--spacing(12)]",
    },
    color: {
      gray: "bg-muted ring-border hover:ring-subtle-foreground/80",
      primary: [
        "data-[state=unchecked]:bg-muted data-[state=unchecked]:ring-border hover:data-[state=unchecked]:ring-subtle-foreground/80",
        "data-[state=checked]:bg-primary-solid data-[state=checked]:ring-primary-solid",
      ],
    },
  },
  defaultVariants: { size: "md", color: "gray" },
});

type SwitchRootProps = ComponentPropsWithRef<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchRootVariants>;

const SwitchRoot = ({ className, size, color, ...props }: SwitchRootProps) => (
  <SwitchPrimitive.Root
    className={switchRootVariants({ className, size, color })}
    {...props}
  />
);

const switchThumbVariants = tv({
  base: [
    "flex items-center justify-center rounded-[inherit] text-solid shadow-sm transition-[translate]",
    "shrink-0",
    "size-(--switch-height) scale-[0.8]",
    "data-[state=checked]:translate-x-[calc(var(--switch-width)-var(--switch-height))]",
  ],
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-md",
      md: "text-md",
      lg: "text-lg",
    },
    color: {
      gray: "bg-gray-50",
      primary:
        "data-[state=checked]:bg-primary-solid-foreground data-[state=unchecked]:bg-gray-50",
    },
  },
  defaultVariants: { size: "md", color: "gray" },
});

type SwitchThumbProps = ComponentPropsWithRef<typeof SwitchPrimitive.Thumb> &
  VariantProps<typeof switchThumbVariants>;

const SwitchThumb = ({
  className,
  size,
  color,
  ...props
}: SwitchThumbProps) => (
  <SwitchPrimitive.Thumb
    className={switchThumbVariants({ className, size, color })}
    {...props}
  />
);

type SwitchProps = {
  switchThumbProps?: Omit<SwitchThumbProps, "children">;
} & SwitchRootProps;

const Switch = ({
  children,
  size,
  color,
  switchThumbProps,
  ...props
}: SwitchProps) => (
  <SwitchRoot size={size} color={color} {...props}>
    <SwitchThumb size={size} color={color} {...switchThumbProps}>
      {children}
    </SwitchThumb>
  </SwitchRoot>
);

export {
  Switch,
  type SwitchProps,
  SwitchRoot,
  type SwitchRootProps,
  switchRootVariants,
  SwitchThumb,
  type SwitchThumbProps,
  switchThumbVariants,
};
