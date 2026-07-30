import { TRPCError } from "@trpc/server";

import { contactFormSchema } from "../schemas/contact/contactForm";
import { messagesCreateResponseSchema } from "../schemas/mailgun/messages";
import { verifyToken } from "../services/cloudflare";
import { createMessage } from "../services/mailgun";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { env } from "../utils/env";
import { cfTurnstileErrorToTrpcError } from "../utils/errorHandling";

const contactRouter = createTRPCRouter({
  sendMessage: baseProcedure
    .input(contactFormSchema)
    .output(messagesCreateResponseSchema)
    .mutation(async (opts) => {
      const response = await verifyToken(opts.input.token);

      if (!response.success) {
        const errorCode = response["error-codes"][0];

        // TODO: maybe use AggregateError when there are multiple errors
        throw new TRPCError(
          errorCode !== undefined && errorCode in cfTurnstileErrorToTrpcError ?
            cfTurnstileErrorToTrpcError[errorCode]
          : {
              code: "INTERNAL_SERVER_ERROR",
              message: "Turnstile verification failed due to an unknown error.",
            },
        );
      }

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
