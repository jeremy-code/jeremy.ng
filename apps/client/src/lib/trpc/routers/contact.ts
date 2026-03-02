import { ContactFormSchema } from "#schemas/contact/contactForm";
import { MessagesSendResult } from "#schemas/mailgun/messages";
import { env } from "#utils/env";

import { baseProcedure, createTRPCRouter } from "../init";
import { mailgunCaller } from "./mailgun";

const contactRouter = createTRPCRouter({
  sendMessage: baseProcedure
    .input(ContactFormSchema)
    .output(MessagesSendResult)
    .query((opts) => {
      return mailgunCaller.sendMessage({
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

export { ContactFormSchema, contactRouter };
