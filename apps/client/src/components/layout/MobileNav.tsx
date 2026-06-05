import type { ComponentPropsWithRef } from "react";

import { Link as RouterLink } from "@tanstack/react-router";
import { VisuallyHidden } from "radix-ui";
import { cn } from "tailwind-variants";

import { Button, type ButtonProps } from "@jeremyng/ui/components/Button";
import { navigationMenuTriggerVariants } from "@jeremyng/ui/components/NavigationMenu";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@jeremyng/ui/components/Popover";

import { NAVIGATION_ITEMS } from "./constants";

const MobileNavButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn("group/navbar", className)}
      variant="outline"
      size="icon"
      {...props}
    >
      <VisuallyHidden.Root className="group-data-[state=open]/navbar:hidden">
        Open menu
      </VisuallyHidden.Root>
      <VisuallyHidden.Root className="group-data-[state=closed]/navbar:hidden">
        Close menu
      </VisuallyHidden.Root>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        className="size-4 stroke-foreground stroke-2"
      >
        {/**
         * The following paths are lines of width 18px and height 2px
         * in the 24x24 viewBox. The center of top path and bottom
         * path is (12,18) and (12,6), respectively. Hence, after a
         * rotation, to center them they are translated by 6px in the
         * y-direction.
         */}
        <path
          className="origin-center transition-transform transform-stroke group-data-[state=open]/navbar:translate-y-1.5 group-data-[state=open]/navbar:rotate-45"
          d="M4 6H20"
        />
        <path
          /**
           * Transition between the default state (line centered at y=12
           * with width 18px) to a point located at the SVG's center
           * (12,12) when open. Since `d` CSS property is not supported in
           * Safari, use opacity to fade in/out.
           *
           * @see {@link https://caniuse.com/mdn-css_properties_d}
           */
          className="transition-[d,opacity] group-data-[state=open]/navbar:opacity-0 group-data-[state=open]/navbar:[d:path('M12_12H12')]"
          d="M4 12H20"
        />
        <path
          className="origin-center transition-transform transform-stroke group-data-[state=open]/navbar:-translate-y-1.5 group-data-[state=open]/navbar:-rotate-45"
          d="M4 18H20"
        />
      </svg>
    </Button>
  );
};

type MobileNavProps = ComponentPropsWithRef<typeof Popover>;

/**
 * While <Popover> is not the ideal component for a mobile navigation menu,
 * using the <NavigationMenu> component would require significant changes (e.g.
 * the default behavior is opening the menu on hover, close on `mouseleave`,
 * etc.). In regards to accessibility, <Popover> does initially trap focus
 * inside <PopoverContent>.
 */
const MobileNav = (props: MobileNavProps) => {
  return (
    <Popover {...props}>
      <nav className="sm:hidden">
        <PopoverTrigger asChild>
          <MobileNavButton />
        </PopoverTrigger>

        <PopoverAnchor asChild>
          {/* Anchor is set to element that is size of <Navbar /> */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          />
        </PopoverAnchor>
        <PopoverContent
          hideWhenDetached={true} // If window size changes, hide content
          onInteractOutside={(e) => e.preventDefault()}
          className="w-(--radix-popover-content-available-width) rounded-t-none bg-background"
        >
          <ul className="space-y-0.5">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <RouterLink
                  to={item.href}
                  // Using <NavigationMenuLink> would error due to not being in
                  // a <NavigationMenu>
                  className={navigationMenuTriggerVariants({
                    variant: "link",
                  })}
                >
                  {item.name}
                </RouterLink>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </nav>
    </Popover>
  );
};

export { MobileNav, type MobileNavProps };
