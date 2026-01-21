import type { ComponentPropsWithRef } from "react";

import Link from "next/link";
import { cn } from "tailwind-variants";

import { ThemeToggle } from "#components/misc/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@jeremyng/ui/components/NavigationMenu";

const NAVBAR_ITEMS = [
  {
    href: "/",
    name: "Home",
  },
];

export const Navbar = ({
  className,
  ...props
}: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("border-b", className)} {...props}>
      <div className="container flex items-center justify-between py-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          Jeremy Nguyen
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu className="grow">
            <NavigationMenuList>
              {NAVBAR_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild variant="trigger">
                    <Link href={item.href}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle variant="secondary" size="icon" />
        </div>
      </div>
    </header>
  );
};
