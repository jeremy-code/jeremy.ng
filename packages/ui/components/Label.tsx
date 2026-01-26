import type { ComponentPropsWithRef } from "react";

import { Label as LabelPrimitive } from "radix-ui";
import { tv, type VariantProps } from "tailwind-variants";

const labelVariants = tv({
  base: [
    "mb-1 flex items-center gap-1 text-start text-sm/5 font-medium text-foreground",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    "data-disabled:cursor-not-allowed data-disabled:opacity-70",
  ],
});

type LabelProps = ComponentPropsWithRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root className={labelVariants({ className })} {...props} />
);

export { labelVariants, type LabelProps, Label };
