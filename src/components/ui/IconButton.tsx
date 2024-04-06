import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled } from "@/lib/styled/jsx";
import { iconButton } from "@/lib/styled/recipes";

export const IconButton = styled(ark.button, iconButton);
export interface IconButtonProps extends ComponentProps<typeof IconButton> {}
