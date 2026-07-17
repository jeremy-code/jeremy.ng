import type { ComponentPropsWithRef } from "react";

import { Form as FormPrimitive } from "@base-ui/react/form";
import { tv } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const formVariants = tv({ base: "flex w-full flex-col gap-4" });

type FormProps = ComponentPropsWithRef<typeof FormPrimitive>;

const Form = (props: FormProps) => {
  return (
    <FormPrimitive
      {...props}
      className={composeRenderProps(props.className, (className) =>
        formVariants({ className }),
      )}
    />
  );
};

export { Form, type FormProps, formVariants };
