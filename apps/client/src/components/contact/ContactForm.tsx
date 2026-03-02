"use client";

import { type ComponentPropsWithRef } from "react";

import { useAppForm } from "#hooks/useAppForm";
import { ContactFormSchema } from "#schemas/contact/contactForm";
import { Form } from "@jeremyng/ui/components/Form";
import { Separator } from "@jeremyng/ui/components/Separator";

type ContactFormProps = ComponentPropsWithRef<typeof Form>;

const ContactForm = (props: ContactFormProps) => {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: ContactFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form.AppForm>
      <Form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        {...props}
      >
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField
              label="First Name"
              inputProps={{
                required: true,
                type: "text",
                autoComplete: "name",
                placeholder: "Jon Postel",
              }}
            />
          )}
        />
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField
              label="Email Address"
              inputProps={{
                required: true,
                type: "email",
                autoComplete: "email",
                placeholder: "postel@example.com",
              }}
            />
          )}
        />
        <form.AppField
          name="message"
          children={(field) => (
            <field.TextareaField
              label="Message"
              textareaProps={{
                // https://www.rfc-editor.org/rfc/rfc761#section-2.10
                placeholder:
                  "TCP implementations should follow a general principle of robustness: be conservative in what you do, be liberal in what you accept from others.",
                required: true,
              }}
            />
          )}
        />
        <Separator className="my-4" />
        <div className="flex items-center justify-end gap-2.5">
          <form.SubmitButton className="max-sm:w-full" />
        </div>
      </Form>
    </form.AppForm>
  );
};

export { ContactForm, type ContactFormProps };
