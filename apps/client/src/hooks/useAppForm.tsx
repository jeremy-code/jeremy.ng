import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { SubmitButton } from "#components/form/SubmitButton";
import { TextField } from "#components/form/TextField";
import { TextareaField } from "#components/form/TextareaField";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
  },
});

export {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
  useAppForm,
};
