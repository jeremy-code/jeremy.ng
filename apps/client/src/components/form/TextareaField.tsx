import { useFieldContext } from "#hooks/useAppForm";
import { Field, FieldError, FieldLabel } from "@jeremyng/ui/components/Field";
import { Textarea, type TextareaProps } from "@jeremyng/ui/components/Textarea";

type TextareaFieldProps = {
  label: string;
  textareaProps?: TextareaProps;
};

const TextareaField = ({ label, textareaProps }: TextareaFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <Field
      name={field.name}
      invalid={!field.state.meta.isValid}
      dirty={field.state.meta.isDirty}
      touched={field.state.meta.isTouched}
    >
      <FieldLabel>{label}</FieldLabel>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...textareaProps}
      />
      <FieldError match={!field.state.meta.isValid}>
        Please enter a valid {field.name}.
      </FieldError>
    </Field>
  );
};

export { TextareaField, type TextareaFieldProps };
