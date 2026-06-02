import { env } from "../config/env";
import { ContactForm } from "../schemas/contact/contactForm";
import { MessagesSendResult } from "../schemas/mailgun/messages";
import { sendMessage } from "../services/mailgun";
import { baseProcedure, createTRPCRouter } from "../trpc";

const contactRouter = createTRPCRouter({
  sendMessage: baseProcedure
    .input(ContactForm)
    .output(MessagesSendResult)
    .mutation((opts) => {
      return sendMessage({
        domain: env.MAILGUN_DOMAIN,
        data: {
          from: `Jeremy <jeremy@${env.MAILGUN_DOMAIN}>`,
          to: `Jeremy <jeremy@${env.MAILGUN_DOMAIN}>`,
          cc: `${opts.input.name} <${opts.input.email}>`,
          subject: "New message from contact form on jeremy.ng",
          text: opts.input.message,
        },
      });
    }),
});

export { contactRouter };
