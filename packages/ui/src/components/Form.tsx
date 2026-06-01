import { type ComponentPropsWithRef } from "react";

import { Form as FormPrimitives, Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv } from "tailwind-variants";

import { labelVariants } from "./Label";

const {
  Root: Form,
  Control: FormControl,
  Submit: FormSubmit,
  ValidityState: FormValidityState,
} = FormPrimitives;

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
}: ComponentPropsWithRef<typeof FormPrimitives.Field>) => {
  return (
    <FormPrimitives.Field className={cn("mb-2.5 grid", className)} {...props} />
  );
};

const formLabelVariants = tv({
  extend: labelVariants,
  base: "data-invalid:text-destructive",
});

const FormLabel = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof FormPrimitives.Label>) => {
  return (
    <FormPrimitives.Label
      className={formLabelVariants({ className })}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof FormPrimitives.Message>) => {
  return (
    <FormPrimitives.Message
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
