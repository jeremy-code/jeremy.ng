import React, { ReactNode, useCallback } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

type FormFieldProps = {
  name: "name" | "email" | "message";
  error?: FieldError;
  children: ReactNode;
};

const FormField = ({ name, error, children }: FormFieldProps) => {
  const capitalize = useCallback((str: string) => str.charAt(0).toUpperCase() + str.slice(1), []);

  return (
    <FormControl isInvalid={!!error} mb={4}>
      <FormLabel>{capitalize(name)}</FormLabel>
      {children}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
