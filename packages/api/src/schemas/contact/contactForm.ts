import * as z from "zod";

import { tokenSchema } from "../cloudflare/turnstile";

const contactFormSchema = z.strictObject({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
  token: tokenSchema,
});

type ContactForm = z.infer<typeof contactFormSchema>;

export { contactFormSchema, type ContactForm };
