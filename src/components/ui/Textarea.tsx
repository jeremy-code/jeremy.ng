import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled } from "@/lib/styled/jsx";
import { textarea } from "@/lib/styled/recipes";

export const Textarea = styled(ark.textarea, textarea);
export interface TextareaProps extends ComponentProps<typeof Textarea> {}
