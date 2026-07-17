import { useFieldContext } from "#hooks/useAppForm";
import { Field, FieldError, FieldLabel } from "@jeremyng/ui/components/Field";
import { Input, type InputProps } from "@jeremyng/ui/components/Input";

type TextFieldProps = {
  label: string;
  inputProps?: InputProps;
};

const TextField = ({ label, inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <Field
      name={field.name}
      invalid={!field.state.meta.isValid}
      dirty={field.state.meta.isDirty}
      touched={field.state.meta.isTouched}
    >
      <FieldLabel>{label}</FieldLabel>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...inputProps}
      />
      <FieldError match="valueMissing">Please enter a {field.name}.</FieldError>
      <FieldError match={!field.state.meta.isValid}>
        Please enter a valid {field.name}.
      </FieldError>
    </Field>
  );
};

export { TextField, type TextFieldProps };
