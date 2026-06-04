import type { ComponentPropsWithRef } from "react";

import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { Logo } from "#components/misc/Logo";
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
] as const;

const Navbar = ({ className, ...props }: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("border-b", className)} {...props}>
      <div className="container flex items-center justify-between py-4">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <Logo />
          Jeremy Nguyen
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu className="grow">
            <NavigationMenuList>
              {NAVBAR_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild variant="trigger">
                    <Link to={item.href}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle size="lg" />
        </div>
      </div>
    </header>
  );
};

export { Navbar };
