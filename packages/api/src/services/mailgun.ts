import Mailgun from "mailgun.js";
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
    mailgunClient.messages.create(input.domain, input.data),
  );

export { sendMessage };
