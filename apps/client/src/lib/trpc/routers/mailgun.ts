import FormData from "form-data";
import Mailgun from "mailgun.js";
import type { MailgunMessageData } from "mailgun.js/definitions";

import {
  MessagesSendRequest,
  MessagesSendResult,
} from "#schemas/mailgun/messages";
import { env } from "#utils/env";

import { baseProcedure, createTRPCRouter } from "../init";

const mailgun = new Mailgun(FormData);
const mailgunClient = mailgun.client({
  username: "api",
  key: env.MAILGUN_API_KEY,
});

const mailgunRouter = createTRPCRouter({
  sendMessage: baseProcedure
    .input(MessagesSendRequest)
    .output(MessagesSendResult)
    .query((opts) => {
      return mailgunClient.messages.create(
        opts.input.domain,
        opts.input.data as MailgunMessageData, // Valid runtime types, TypeScript doesn't handle the intersection (&) well
      );
    }),
});

const mailgunCaller = mailgunRouter.createCaller({});

export { mailgunRouter, mailgunCaller };
