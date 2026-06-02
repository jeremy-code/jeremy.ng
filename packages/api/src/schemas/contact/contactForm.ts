import { z } from "zod";

const ContactForm = z.strictObject({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

type ContactForm = z.infer<typeof ContactForm>;

export { ContactForm };
