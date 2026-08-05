import * as z from "zod";

import { tokenSchema } from "../cloudflare/turnstile";

const contactFormSchema = z.strictObject({
  // Trim strings since accepting user input
  name: z.string().trim().min(1),
  email: z.email().trim(),
  message: z.string().trim().min(1),
  token: tokenSchema,
});

type ContactForm = z.infer<typeof contactFormSchema>;

export { contactFormSchema, type ContactForm };
