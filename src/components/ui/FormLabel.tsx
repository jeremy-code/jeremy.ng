import type { ComponentProps } from "react";
import { ark } from "@ark-ui/react/factory";

import { styled } from "@/lib/styled/jsx";
import { formLabel } from "@/lib/styled/recipes";

export const FormLabel = styled(ark.label, formLabel);
export interface FormLabelProps extends ComponentProps<typeof FormLabel> {}
