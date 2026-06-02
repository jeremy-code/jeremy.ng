import { z } from "zod";

const ContactFormSchema = z.strictObject({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

export { ContactFormSchema };
