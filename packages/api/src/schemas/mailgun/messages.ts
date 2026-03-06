import type { MailgunMessageContent as IMailgunMessageContent } from "mailgun.js/definitions";
import { z } from "zod";

import { Arrayable } from "../common/Arrayable";
import { Booleanish } from "../common/Booleanish";
import { JsonObject } from "../common/JsonObject";

const MimeMessage = z.union([
  z.string(),
  z.instanceof(Blob),
  z.instanceof(Buffer),
  z.instanceof(ReadableStream),
]);
const CustomFileData = z.union([...MimeMessage.options, z.instanceof(File)]);
const CustomFile = z
  .object({
    data: CustomFileData,
    filename: z.string().optional(),
    contentType: z.string().optional(),
    knownLength: z.number().optional(),
  })
  .catchall(z.unknown());
const MessageAttachment = z.union([
  ...Arrayable(CustomFile).options,
  ...Arrayable(z.instanceof(File)).options,
  z.string(),
  ...Arrayable(CustomFileData).options,
]);
const FormDataInputValue = z.union([
  MimeMessage,
  CustomFileData,
  ...Arrayable(z.string()).options,
  z.boolean(),
  MessageAttachment,
  z.undefined(),
  z.number(),
  JsonObject,
]);

const isMailgunMessageContent = (
  content: unknown,
): content is IMailgunMessageContent =>
  content !== null &&
  typeof content === "object" &&
  ("text" in content ||
    "html" in content ||
    "message" in content ||
    "template" in content);

const MailGunMessageContent = z
  .object({
    text: z.string().optional(),
    html: z.string().optional(),
    message: MimeMessage.optional(),
    template: z.string().optional(),
  })
  .refine(isMailgunMessageContent, {
    message:
      "At least one of 'text', 'html', 'message', or 'template' must be provided.",
  });

const MailgunMessageData = z.intersection(
  MailGunMessageContent,
  z
    .object({
      from: z.string().optional(),
      to: Arrayable(z.string()).optional(),
      cc: Arrayable(z.string()).optional(),
      bcc: Arrayable(z.string()).optional(),
      subject: z.string().optional(),
      "amp-html": z.string().optional(),
      attachment: MessageAttachment.optional(),
      inline: z.any().optional(),
      "t:version": z.string().optional(),
      "t:text": Booleanish.optional(),
      "t:variables": z.union([z.string(), JsonObject]).optional(),
      "o:tag": Arrayable(z.string()).optional(),
      "o:dkim": Booleanish.optional(),
      "o:deliverytime": z.string().optional(),
      "o:deliverytime-optimize-period": z.string().optional(),
      "o:time-zone-localize": z.string().optional(),
      "o:testmode": Booleanish.optional(),
      "o:tracking": Booleanish.optional(),
      "o:tracking-clicks": z
        .union([...Booleanish.options, z.literal("htmlonly")])
        .optional(),
      "o:tracking-opens": Booleanish.optional(),
      "o:require-tls": Booleanish.optional(),
      "o:skip-verification": Booleanish.optional(),
      "recipient-variables": z.string().optional(),
      "h:X-My-Header": z.string().optional(),
      "v:my-var": z.string().optional(),
    })
    .catchall(FormDataInputValue),
);
type MailgunMessageData = z.infer<typeof MailgunMessageData>;

const MessagesSendRequest = z.object({
  domain: z.string(),
  data: MailgunMessageData,
});
type MessagesSendRequest = z.infer<typeof MessagesSendRequest>;

const MessagesSendResult = z.object({
  id: z.string().optional(),
  message: z.string().optional(),
  status: z.number(),
  details: z.string().optional(),
});
type MessagesSendResult = z.infer<typeof MessagesSendResult>;

export { MailgunMessageData, MessagesSendRequest, MessagesSendResult };
