import React, { useTransition } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ContactFormInput, ContactFormTextarea } from "@/components/Contact";
import { addItem } from "@/app/actions";
import type { ContactFormData } from "./types";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  message: yup.string().required("Message is required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: yupResolver(schema) });
  const [_isPending, startTransition] = useTransition();
  const toast = useToast();

  const onSuccessToast = () =>
    toast({ title: "Success", description: "Your message has been sent.", status: "success" });
  const onErrorToast = () =>
    toast({ title: "Error", description: "Something went wrong.", status: "error" });

  const onSubmit = handleSubmit(async (data: ContactFormData) => {
    startTransition(async () => {
      try {
        await addItem(data);
        onSuccessToast();
        reset();
      } catch (error) {
        onErrorToast();
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <ContactFormInput
        name="name"
        placeholder="Jane Doe"
        register={register}
        error={errors.name}
      />
      <ContactFormInput
        name="email"
        placeholder="jane.doe@starfleet.com"
        register={register}
        error={errors.email}
      />
      <ContactFormTextarea
        name="message"
        placeholder="Hi, I'm a software engineer..."
        register={register}
        error={errors.message}
      />
      <Button type="submit" isLoading={isSubmitting} mt={4} colorScheme="primary">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
