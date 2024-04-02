import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled } from "@/lib/styled/jsx";
import { input } from "@/lib/styled/recipes";

export const Input = styled(ark.input, input);
export interface InputProps extends ComponentProps<typeof Input> {}
