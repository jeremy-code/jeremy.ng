import Mailgun from "mailgun.js";
import { z } from "zod";

import {
  MessagesSendRequestParams,
  MessagesSendResponse,
} from "../schemas/mailgun/messages";
import { env } from "../utils/env";

const mailgun = new Mailgun(FormData);

const mailgunClient = mailgun.client({
  username: "api",
  key: env.MAILGUN_API_KEY,
});

const createMessageSchema = z.function({
  input: [MessagesSendRequestParams],
  output: MessagesSendResponse,
});

const createMessage = createMessageSchema.implementAsync((input) =>
  mailgunClient.messages.create(input.domain, input.data),
);

export { createMessage };
