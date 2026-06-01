import { type ComponentPropsWithRef } from "react";

import { Form as FormPrimitive, Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv } from "tailwind-variants";

import { labelVariants } from "./Label";

const {
  Root: Form,
  Control: FormControl,
  Submit: FormSubmit,
  ValidityState: FormValidityState,
} = FormPrimitive;

const FormHeader = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn("flex items-baseline justify-between", className)}
      {...props}
    />
  );
};

const FormField = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof FormPrimitive.Field>) => {
  return (
    <FormPrimitive.Field className={cn("mb-2.5 grid", className)} {...props} />
  );
};

const formLabelVariants = tv({
  extend: labelVariants,
  base: "data-invalid:text-destructive",
});

const FormLabel = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof FormPrimitive.Label>) => {
  return (
    <FormPrimitive.Label
      className={formLabelVariants({ className })}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof FormPrimitive.Message>) => {
  return (
    <FormPrimitive.Message
      className={cn("text-xs text-gray-300", className)}
      {...props}
    />
  );
};

export {
  Form,
  FormControl,
  FormHeader,
  FormField,
  FormLabel,
  FormMessage,
  FormValidityState,
  FormSubmit,
};
