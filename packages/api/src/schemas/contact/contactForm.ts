import * as z from "zod";

const contactFormSchema = z.strictObject({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export { contactFormSchema, type ContactForm };
