import { Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

import { FormField } from "@/components/Contact";
import { Icon } from "@/components/Misc";
import type { ContactFormData } from "./types";

type ContactFormProps = {
  name: "name" | "email";
  placeholder: string;
  error?: FieldError;
  register: UseFormRegister<ContactFormData>;
};

const ContactFormInput = ({ name, placeholder, error, register }: ContactFormProps) => {
  return (
    <FormField name={name} error={error}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          <Icon name={name} />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          {...register(name)}
          variant={useColorModeValue("outline", "filled")}
        />
      </InputGroup>
    </FormField>
  );
};
export default ContactFormInput;
