import { Textarea, useColorModeValue } from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/Contact";
import type { ContactFormData } from "./types";

type ContactFormTextareaProps = {
  name: "message";
  placeholder: string;
  error?: FieldError;
  register: UseFormRegister<ContactFormData>;
};

const ContactFormTextarea = ({ name, placeholder, error, register }: ContactFormTextareaProps) => {
  return (
    <FormField name={name} error={error}>
      <Textarea
        placeholder={placeholder}
        {...register(name)}
        variant={useColorModeValue("outline", "filled")}
      />
    </FormField>
  );
};

export default ContactFormTextarea;
