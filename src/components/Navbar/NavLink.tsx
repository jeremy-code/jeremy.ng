import React, { ReactNode, useCallback } from "react";
import { Link, LinkProps } from "@chakra-ui/next-js";
import { useColorModeValue } from "@chakra-ui/react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
} & LinkProps;

const NavLink = ({ href, children, ...props }: NavLinkProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const element = document.getElementById(href);
      const y = element ? element.getBoundingClientRect().top + window.scrollY + 1 : 0;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [href]
  );

  return (
    <Link
      color={useColorModeValue("gray.600", "gray.100")}
      href={`#${href}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
