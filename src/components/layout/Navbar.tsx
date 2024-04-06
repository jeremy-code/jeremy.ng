import type { ComponentProps } from "react";
import Image from "next/image";

import { Link } from "@/components/ui";
import { css, cx } from "@/lib/styled/css";
import { Flex } from "@/lib/styled/jsx";
import { container, flex } from "@/lib/styled/patterns";
import { Icon } from "@/assets";
import { ToggleThemeSwitch } from "../misc/ToggleThemeSwitch";

export const Navbar = (props: ComponentProps<"header">) => {
  return (
    <header
      {...props}
      className={cx(
        css({
          pos: "absolute",
          left: 0,
          right: 0,
          py: 5,
        }),
        props.className
      )}
    >
      <nav
        className={cx(
          container(),
          flex({ justify: "space-between", align: "center" })
        )}
      >
        <Flex gap={2}>
          <Link href="/">
            {/* 1rem = 16px */}
            <Image src={Icon} width={16} height={16} alt="Favicon" priority />
          </Link>
          <Link href="/" textStyle="lg" fontWeight="medium" ul="none">
            Jeremy Nguyen
          </Link>
        </Flex>

        <ToggleThemeSwitch />
      </nav>
    </header>
  );
};
