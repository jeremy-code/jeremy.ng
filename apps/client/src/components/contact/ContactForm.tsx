import { Suspense, useRef, type ComponentPropsWithRef } from "react";
import { lazy } from "react";

import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { getDotPath } from "@standard-schema/utils";

import { useAppForm } from "#hooks/useAppForm";
import { getTurnstileClientErrorMessage } from "#lib/cloudflare/getTurnstileClientErrorMessage";
import { useTRPCClient } from "#lib/trpc/client";
import { Token } from "@jeremyng/api/schemas/cloudflare/turnstile";
import { ContactForm as ContactFormSchema } from "@jeremyng/api/schemas/contact/contactForm";
import { Form } from "@jeremyng/ui/components/Form";
import { Separator } from "@jeremyng/ui/components/Separator";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";
import { toast } from "@jeremyng/ui/stores/toastStore";

type ContactFormProps = ComponentPropsWithRef<typeof Form>;

const Captcha = lazy(() =>
  import("#components/form/Captcha").then((mod) => ({ default: mod.Captcha })),
);

const ContactForm = (props: ContactFormProps) => {
  const turnstileRef = useRef<TurnstileInstance>(undefined);
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
    onSubmit: async ({ value, formApi }) => {
      try {
        await trpcClient.cloudflare.verifyToken.mutate(value.token);
        try {
          const { status } = await trpcClient.contact.sendMessage.mutate({
            name: value.name,
            email: value.email,
            message: value.message,
          });
          toast({
            title: `Message sent successfully with status ${status}`,
          });
          formApi.reset();
        } catch (e) {
          toast({
            title: "Message sent failed",
            description:
              e instanceof Error ? e.message : "An unknown error occurred.",
            variant: "destructive",
          });
        }
      } catch (e) {
        toast({
          title: "Captcha verification failed",
          description:
            e instanceof Error ? e.message : "An unknown error occurred.",
          variant: "destructive",
        });
      } finally {
        // Reset if the token was valid (consumed, no longer usable) or if there
        // was an error (invalid token, attempt to get a new one)
        turnstileRef.current?.reset();
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
              label="Name"
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
                // line height + padding-y + border (can't use content-box
                // because then the width is too long)
                className:
                  "field-sizing-content min-h-[calc(var(--rows)*1lh+--spacing(4)+2px)] max-sm:[--rows:4] sm:[--rows:3]",
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
              <Suspense fallback={<Skeleton className="mb-2.5 h-16.25 w-75" />}>
                <Captcha
                  ref={turnstileRef}
                  className="mb-2.5"
                  onSuccess={(token) => {
                    field.handleChange(token);
                  }}
                  onError={(error) => {
                    const errorMessage = getTurnstileClientErrorMessage(error);
                    console.error(
                      `[Cloudflare Turnstile] Error ${error}: ${errorMessage}.`,
                    );
                    field.setErrorMap({
                      onSubmit: (
                        field.state.meta.errorMap.onSubmit ?? []
                      ).concat({ message: errorMessage, path: [field.name] }),
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
              </Suspense>
              {field.state.meta.errors.length !== 0 ?
                <ul className="mt-1 list-inside list-disc">
                  {field.state.meta.errors.map((error, index) =>
                    error !== undefined ?
                      <li
                        key={`${error.message}-${getDotPath(error)}`}
                        id={`captcha-error-${index}`}
                        className="text-sm text-destructive"
                      >
                        {error.message}
                      </li>
                    : null,
                  )}
                </ul>
              : null}
            </>
          )}
        />
        <Separator className="mt-2.5 mb-2.5" />
        <div className="flex items-center justify-end gap-2.5">
          <form.SubmitButton className="max-sm:w-full" />
        </div>
      </Form>
    </form.AppForm>
  );
};

export { ContactForm, type ContactFormProps };
