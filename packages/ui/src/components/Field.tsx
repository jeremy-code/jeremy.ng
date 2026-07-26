import type { ComponentPropsWithRef } from "react";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { tv } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const fieldVariants = tv({
  slots: {
    root: "relative flex w-full flex-col items-start gap-1.5",
    label: [
      "flex items-center gap-1 text-start text-sm font-medium text-foreground select-none",
      "disabled:opacity-50",
    ],
    // No field control, use Input, Textarea
    control: null,
    error: "inline-flex items-center gap-1 text-xs/4 text-destructive",
    description: "text-xs text-muted-foreground",
  },
});

type FieldProps = ComponentPropsWithRef<typeof FieldPrimitive.Root>;

const Field = (props: FieldProps) => {
  return (
    <FieldPrimitive.Root
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldVariants().root({ className }),
      )}
    />
  );
};

type FieldLabelProps = ComponentPropsWithRef<typeof FieldPrimitive.Label>;

const FieldLabel = (props: FieldLabelProps) => {
  return (
    <FieldPrimitive.Label
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldVariants().label({ className }),
      )}
    />
  );
};

type FieldErrorProps = ComponentPropsWithRef<typeof FieldPrimitive.Error>;

const FieldError = (props: FieldErrorProps) => {
  return (
    <FieldPrimitive.Error
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldVariants().error({ className }),
      )}
    />
  );
};

type FieldDescriptionProps = ComponentPropsWithRef<
  typeof FieldPrimitive.Description
>;

const FieldDescription = (props: FieldDescriptionProps) => {
  return (
    <FieldPrimitive.Description
      {...props}
      className={composeRenderProps(props.className, (className) =>
        fieldVariants().description({ className }),
      )}
    />
  );
};

export {
  Field,
  type FieldProps,
  fieldVariants,
  FieldLabel,
  type FieldLabelProps,
  FieldError,
  type FieldErrorProps,
  FieldDescription,
  type FieldDescriptionProps,
};
