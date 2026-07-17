import type { ComponentPropsWithRef } from "react";

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { tv, type VariantProps } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const fieldsetVariants = tv({
  slots: {
    root: "flex w-full flex-col",
    legend: ["font-medium text-foreground", "disabled:text-foreground/50"],
  },
  variants: {
    size: {
      sm: {
        root: "gap-2",
        legend: "text-sm",
      },
      md: {
        root: "gap-4",
        legend: "text-sm",
      },
      lg: {
        root: "gap-6",
        legend: "text-md",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type FieldsetProps = ComponentPropsWithRef<typeof FieldsetPrimitive.Root> &
  VariantProps<typeof fieldsetVariants>;

const Fieldset = ({ size, ...props }: FieldsetProps) => {
  return (
    <FieldsetPrimitive.Root
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldsetVariants().root({ className, size }),
      )}
    />
  );
};

type FieldsetLegendProps = ComponentPropsWithRef<
  typeof FieldsetPrimitive.Legend
> &
  VariantProps<typeof fieldsetVariants>;

const FieldsetLegend = ({ size, ...props }: FieldsetLegendProps) => {
  return (
    <FieldsetPrimitive.Legend
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldsetVariants().legend({ className, size }),
      )}
    />
  );
};

export {
  Fieldset,
  type FieldsetProps,
  fieldsetVariants,
  FieldsetLegend,
  type FieldsetLegendProps,
};
