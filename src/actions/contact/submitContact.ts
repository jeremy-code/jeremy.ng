"use server";

import { verifyToken } from "@/lib/captcha";

export const submitContact = async (formData: FormData) => {
  const token = formData.get("cf-turnstile-response");

  if (token === null)
    throw new Error("Missing captcha token", { cause: formData });

  const res = await verifyToken(token);

  if (res) {
    return;
  }
};
