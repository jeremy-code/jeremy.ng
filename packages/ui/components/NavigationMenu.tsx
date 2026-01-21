import type { ComponentPropsWithRef } from "react";

import { ChevronDown } from "lucide-react";
import {
  AccessibleIcon,
  NavigationMenu as NavigationMenuPrimitive,
  Slot,
} from "radix-ui";
import { cn, tv, type VariantProps } from "tailwind-variants";

const NavigationMenuItem = NavigationMenuPrimitive.Item;

type NavigationMenuProps = {
  viewport?: boolean;
} & ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>;

const NavigationMenu = ({
  className,
  children,
  viewport = true,
  ...props
}: NavigationMenuProps) => {
  return (
    <NavigationMenuPrimitive.Root
      className={cn("relative z-10 flex grow justify-center", className)}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
};

const NavigationMenuList = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) => {
  return (
    <NavigationMenuPrimitive.List
      className={cn("flex justify-center gap-2 rounded-md p-1", className)}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <NavigationMenuIndicator />
    </NavigationMenuPrimitive.List>
  );
};

const navigationMenuTriggerVariants = tv({
  base: [
    "rounded px-4 py-3 text-sm/none font-medium text-foreground transition-colors select-none",
    "hover:bg-muted hover:text-foreground",
    "focus:bg-muted focus:text-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      link: "block no-underline", // Defaults to inline
      trigger: "flex items-center justify-between gap-0.5",
    },
  },
  defaultVariants: { variant: "link" },
});

function NavigationMenuTrigger({
  className,
  children,
  variant = "trigger",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger> &
  VariantProps<typeof navigationMenuTriggerVariants>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        navigationMenuTriggerVariants({ className, variant }),
        "group/navigation-menu-trigger",
        className,
      )}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <AccessibleIcon.Root label="Open menu">
        <ChevronDown className="group-radix-state-open/navigation-menu-trigger:rotate-180 relative top-px size-3 transition-transform duration-300" />
      </AccessibleIcon.Root>
    </NavigationMenuPrimitive.Trigger>
  );
}

const NavigationMenuLink = ({
  className,
  variant = "link",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationMenuTriggerVariants>) => {
  return (
    <NavigationMenuPrimitive.Link
      className={navigationMenuTriggerVariants({ className, variant })}
      {...props}
    />
  );
};

const NavigationMenuContent = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>) => {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        "absolute top-0 left-0 w-full sm:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        className,
      )}
      {...props}
    />
  );
};

const NavigationMenuIndicator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>) => {
  return (
    <NavigationMenuPrimitive.Indicator
      className={cn(
        "top-full z-1 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform]",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        // arrow indicator pseudo-element
        "after:relative after:top-1/2 after:size-2.5 after:rotate-45 after:rounded-tl-sm after:border after:bg-subtle",
        className,
      )}
      {...props}
    />
  );
};

const NavigationMenuViewport = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>) => {
  return (
    <div className="absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "relative mt-2.5 origin-[top_center] overflow-hidden rounded-md bg-subtle transition-[width,height]",
          // Using `box-shadow` to simulate border, so it lines up with <NavigationMenuIndicator />'s arrow
          "shadow-[0_0_0_1px] shadow-border",
          "h-(--radix-navigation-menu-viewport-height) w-full sm:w-(--radix-navigation-menu-viewport-width)",
          "data-[state=open]:animate-in data-[state=open]:zoom-in-90 data-[state=open]:fade-in",
          "data-[state=closed]:animate-out data-[state=closed]:zoom-out-90 data-[state=closed]:fade-out",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export {
  NavigationMenuItem,
  type NavigationMenuProps,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
