import type { ComponentProps } from "react";
import NextLink from "next/link";

import { styled } from "@/lib/styled/jsx";
import { link } from "@/lib/styled/recipes";

export const Link = styled(NextLink, link);
export interface LinkProps extends ComponentProps<typeof Link> {}
