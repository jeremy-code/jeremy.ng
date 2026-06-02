import FormData from "form-data";
import Mailgun from "mailgun.js";
import type { MailgunMessageData } from "mailgun.js/definitions";
import { z } from "zod";

import { env } from "../config/env";
import {
  MessagesSendRequest,
  MessagesSendResult,
} from "../schemas/mailgun/messages";

const mailgun = new Mailgun(FormData);

const mailgunClient = mailgun.client({
  username: "api",
  key: env.MAILGUN_API_KEY,
});

const sendMessage = z
  .function({ input: [MessagesSendRequest], output: MessagesSendResult })
  .implementAsync((input) =>
    mailgunClient.messages.create(
      input.domain,
      input.data as MailgunMessageData, // Valid runtime types, TypeScript doesn't handle the intersection (&) well
    ),
  );

export { sendMessage };
