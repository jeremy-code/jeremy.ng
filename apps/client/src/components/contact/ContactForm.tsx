"use client";

import { type ComponentPropsWithRef } from "react";

import { Captcha } from "#components/form/Captcha";
import { useAppForm } from "#hooks/useAppForm";
import { mapTurnstileClientError } from "#lib/cloudflare/mapTurnstileClientError";
import { useTRPCClient } from "#lib/trpc/client";
import { Token } from "#schemas/cloudflare/turnstile";
import { ContactFormSchema } from "#schemas/contact/contactForm";
import { isObject } from "#utils/isObject";
import { mapStatusCode } from "#utils/mapStatusCode";
import { Form } from "@jeremyng/ui/components/Form";
import { Separator } from "@jeremyng/ui/components/Separator";

type ContactFormProps = ComponentPropsWithRef<typeof Form>;

const ContactForm = (props: ContactFormProps) => {
  const trpcClient = useTRPCClient();
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      token: "",
    },
    validators: {
      onSubmit: ContactFormSchema.extend({ token: Token }),
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const verifyTokenRes = await trpcClient.cloudflare.verifyToken.query(
        value.token,
      );
      // TODO: Replace `alert` with toasts
      if (verifyTokenRes.success) {
        const sendMessageRes = await trpcClient.contact.sendMessage.query({
          name: value.name,
          email: value.email,
          message: value.message,
        });
        const sendMessageStatus = mapStatusCode(sendMessageRes.status);
        if (sendMessageStatus.ok) {
          alert("Message sent successfully.");
        } else {
          alert(
            `Message sent unsuccessfully with status ${sendMessageStatus.status}: ${sendMessageStatus.statusText}${sendMessageRes.message !== undefined ? `and message ${sendMessageRes.message}` : ""}.`,
          );
        }
      } else {
        alert(
          `Captcha verification failed with error codes ${verifyTokenRes["error-codes"].join(", ")}. Please try again.`,
        );
      }
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
        <form.AppField
          name="token"
          children={(field) => (
            <>
              <Captcha
                className="my-2"
                onSuccess={(token) => {
                  field.handleChange(token);
                }}
                onError={(error) => {
                  const errorMessage = mapTurnstileClientError(error);
                  console.error(
                    `[Cloudflare Turnstile] Error ${error}: ${errorMessage}.`,
                  );
                  field.setErrorMap({
                    onSubmit: (field.state.meta.errorMap.onSubmit ?? []).concat(
                      { message: errorMessage, path: [field.name] },
                    ),
                  });
                }}
                {...(field.state.meta.errors.length !== 0 ?
                  {
                    "aria-invalid": true,
                    "aria-errormessage": field.state.meta.errors
                      .map((_, index) => `captcha-error-${index}`)
                      .join(" "),
                  }
                : {})}
              />
              {field.state.meta.errors.length !== 0 ?
                <ul className="mt-1 list-inside list-disc">
                  {field.state.meta.errors.map((error, index) => (
                    <li
                      key={`${error?.message}-${error?.path?.map?.((keyOrPathSegment) => (isObject(keyOrPathSegment) && "key" in keyOrPathSegment ? keyOrPathSegment.key : keyOrPathSegment)).join?.() ?? ""}`}
                      id={`captcha-error-${index}`}
                      className="text-sm text-destructive"
                    >
                      {error?.message}
                    </li>
                  ))}
                </ul>
              : null}
            </>
          )}
        />
        <Separator className="mt-5 mb-4" />
        <div className="flex items-center justify-end gap-2.5">
          <form.SubmitButton className="max-sm:w-full" />
        </div>
      </Form>
    </form.AppForm>
  );
};

export { ContactForm, type ContactFormProps };
