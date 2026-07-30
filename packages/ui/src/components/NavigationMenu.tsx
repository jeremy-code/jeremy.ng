import type { ComponentPropsWithRef } from "react";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

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
      {children}
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
      {children}
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

const NavigationMenuTrigger = ({
  children,
  variant = "trigger",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger> &
  VariantProps<typeof navigationMenuTriggerVariants>) => {
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      className={composeRenderProps(props.className, (className) =>
        navigationMenuTriggerVariants({ className, variant }),
      )}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="relative top-px flex items-center transition-transform duration-300 data-popup-open:rotate-180">
        <ChevronDown className="size-3" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
};

const NavigationMenuLink = ({
  variant = "link",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationMenuTriggerVariants>) => {
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      className={composeRenderProps(props.className, (className) =>
        navigationMenuTriggerVariants({ className, variant }),
      )}
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
        "size-full transition-[opacity,transform] sm:w-max",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        "data-starting-style:data-[activation-direction=left]:-translate-x-52",
        "data-starting-style:data-[activation-direction=right]:translate-x-52",
        "data-ending-style:data-[activation-direction=left]:translate-x-52",
        "data-ending-style:data-[activation-direction=right]:-translate-x-52",
        className,
      )}
      {...props}
    />
  );
};

const NavigationMenuArrow = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Arrow>) => {
  return (
    <NavigationMenuPrimitive.Arrow
      className={cn(
        "relative block h-1.5 w-3 overflow-hidden transition-[left,right]",
        "data-[side=bottom]:-top-1.5",
        "data-[side=top]:-bottom-1.5 data-[side=top]:rotate-180",
        "data-[side=left]:-right-2.25 data-[side=left]:rotate-90",
        "data-[side=right]:-left-2.25 data-[side=right]:-rotate-90",
        // arrow indicator pseudo-element
        "after:absolute after:bottom-0 after:left-1/2 after:size-[calc(6px*sqrt(2))] after:-translate-x-1/2 after:translate-y-1/2 after:rotate-45 after:rounded-tl-sm after:border after:border-border after:bg-subtle",
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
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        sideOffset={10}
        className="w-full transition-[top,left,right,bottom] data-instant:transition-none sm:w-(--positioner-width)"
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-md bg-subtle transition-[opacity,transform,width,height]",
            // Using ring to simulate border, so it lines up with <NavigationMenuArrow />'s arrow
            "ring-1 ring-border ring-offset-0",
            "data-starting-style:scale-90 data-starting-style:opacity-0",
            "data-ending-style:scale-90 data-ending-style:opacity-0",
          )}
        >
          <NavigationMenuArrow />
          <NavigationMenuPrimitive.Viewport
            className={cn("relative size-full overflow-hidden", className)}
            {...props}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
};

export {
  NavigationMenuItem,
  NavigationMenu,
  type NavigationMenuProps,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerVariants,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuArrow,
  NavigationMenuViewport,
};
