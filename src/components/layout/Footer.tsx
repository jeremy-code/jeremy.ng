import type { ComponentProps } from "react";

import { Link, Text } from "@/components/ui";
import { cx } from "@/lib/styled/css";
import { flex } from "@/lib/styled/patterns";

export const Footer = (props: ComponentProps<"footer">) => {
  return (
    <footer
      {...props}
      className={cx(
        flex({
          placeContent: "center",
          py: 4,
          borderTop: "1px solid {colors.border.default}",
        }),
        props.className
      )}
    >
      <Text>
        {"Made with ❤️‍🔥 by "}
        <Link href="/" color="accent.text">
          Jeremy
        </Link>
      </Text>
    </footer>
  );
};
