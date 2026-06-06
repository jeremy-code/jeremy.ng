import type { ComponentPropsWithRef } from "react";

import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { ThemeToggle } from "#components/misc/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@jeremyng/ui/components/NavigationMenu";

import { MobileNav } from "./MobileNav";
import { NAVIGATION_ITEMS } from "./constants";

const Navbar = ({ className, ...props }: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("relative border-b", className)} {...props}>
      <div className="container flex items-center justify-between py-4">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <img width="24" height="24" alt="Jeremy Nguyen" src="/favicon.svg" />
          Jeremy Nguyen
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu className="hidden grow sm:flex">
            <NavigationMenuList>
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild variant="trigger">
                    <Link to={item.href}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle size="lg" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export { Navbar };
