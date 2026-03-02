import { useStore } from "@tanstack/react-form";

import { useFieldContext } from "#hooks/useAppForm";
import {
  FormControl,
  FormField,
  FormHeader,
  FormLabel,
  FormMessage,
} from "@jeremyng/ui/components/Form";
import { Input, type InputProps } from "@jeremyng/ui/components/Input";

type TextFieldProps = {
  label: string;
  inputProps?: InputProps;
};

export function TextField({ label, inputProps }: TextFieldProps) {
  const field = useFieldContext<string>();
  const isValid = useStore(field.store, (state) => state.meta.isValid);

  return (
    <FormField name={field.name} serverInvalid={!isValid}>
      <FormHeader>
        <FormLabel>{label}</FormLabel>
        <FormMessage match="valueMissing">
          Please enter your {field.name}.
        </FormMessage>
        <FormMessage match="typeMismatch" forceMatch={!isValid}>
          Please enter a valid {field.name}.
        </FormMessage>
      </FormHeader>
      <FormControl asChild>
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </FormControl>
    </FormField>
  );
}
