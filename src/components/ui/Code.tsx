import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled } from "@/lib/styled/jsx";
import { code } from "@/lib/styled/recipes";

export const Code = styled(ark.code, code);
export interface CodeProps extends ComponentProps<typeof Code> {}
