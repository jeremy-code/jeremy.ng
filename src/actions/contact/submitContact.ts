"use server";

import { email, minLength, object, parse, string } from "valibot";

import { TurnstileResponse, verifyToken } from "@/lib/captcha";
import { parseFormData } from "@/utils/parseFormData";

const ContactFormData = object({
  name: string([minLength(1)]),
  email: string([email()]),
  message: string([minLength(1)]),
  "cf-turnstile-response": TurnstileResponse,
});

export const submitContact = async (formData: FormData) => {
  const { "cf-turnstile-response": token } = parse(
    ContactFormData,
    parseFormData(formData)
  );

  const res = await verifyToken(token);

  if (res) {
    return;
  }
};
