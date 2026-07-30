import { contactFormSchema } from "../schemas/contact/contactForm";
import { messagesCreateResponseSchema } from "../schemas/mailgun/messages";
import { createMessage } from "../services/mailgun";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { env } from "../utils/env";

const contactRouter = createTRPCRouter({
  sendMessage: baseProcedure
    .input(contactFormSchema)
    .output(messagesCreateResponseSchema)
    .mutation((opts) => {
      return createMessage({
        domain: env.MAILGUN_DOMAIN,
        data: {
          from: `Jeremy <hi@${env.MAILGUN_DOMAIN}>`,
          to: `Jeremy <hi@${env.MAILGUN_DOMAIN}>`,
          cc: `${opts.input.name} <${opts.input.email}>`,
          subject: "New message from contact form on jeremy.ng",
          text: opts.input.message,
        },
      });
    }),
});

export { contactRouter };
