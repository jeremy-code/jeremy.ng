import { Readable } from "node:stream";

import type {
  MailgunMessageContent as IMailgunMessageContent,
  MailgunMessageData as IMailgunMessageData,
  MimeMessage as IMimeMessage,
  CustomFileData as ICustomFileData,
  CustomFile as ICustomFile,
  MessageAttachment as IMessageAttachment,
  FormDataInputValue as IFormDataInputValue,
  MessagesSendResult as IMessagesSendResult,
} from "mailgun.js/definitions";
import * as z from "zod";

import { arrayableSchema } from "../common/arrayable";
import { jsonObjectSchema } from "../common/jsonObject";

const booleanishSchema = z.union([z.boolean(), z.enum(["yes", "no"])]);

const mimeMessageSchema = z.toZod<IMimeMessage>()(
  z.union([
    z.string(),
    z.instanceof(Blob),
    z.instanceof(Buffer),
    z.instanceof(Readable).transform((arg): NodeJS.ReadableStream => arg),
  ]),
);

const customFileDataSchema = z.toZod<ICustomFileData>()(
  z.union([...mimeMessageSchema.options, z.instanceof(File)]),
);

const customFileSchema = z.toZod<ICustomFile>()(
  z
    .strictObject({
      data: customFileDataSchema,
      filename: z.string().optional(),
      contentType: z.string().optional(),
      knownLength: z.number().optional(),
    })
    .catchall(z.unknown()),
);

const messageAttachmentSchema = z.toZod<IMessageAttachment>()(
  z.union([
    ...arrayableSchema(customFileSchema).options,
    ...arrayableSchema(z.instanceof(File)).options,
    z.string(),
    ...arrayableSchema(customFileDataSchema).options,
  ]),
);

const formDataInputValueSchema = z.toZod<IFormDataInputValue>()(
  z.union([
    mimeMessageSchema,
    customFileDataSchema,
    ...arrayableSchema(z.string()).options,
    z.boolean(),
    messageAttachmentSchema,
    z.undefined(),
    z.number(),
    jsonObjectSchema,
  ]),
);

const isMailgunMessageContent = (
  content: unknown,
): content is IMailgunMessageContent =>
  content !== null &&
  typeof content === "object" &&
  ("text" in content ||
    "html" in content ||
    "message" in content ||
    "template" in content);

const mailGunMessageContentSchema = z.toZod<IMailgunMessageContent>()(
  z
    .strictObject({
      text: z.string().optional(),
      html: z.string().optional(),
      message: mimeMessageSchema.optional(),
      template: z.string().optional(),
    })
    .transform((input, ctx): IMailgunMessageContent => {
      if (isMailgunMessageContent(input)) {
        return input;
      }
      ctx.addIssue({
        input,
        code: "custom",
        message:
          "At least one of 'text', 'html', 'message', or 'template' must be provided.",
      });
      return z.NEVER;
    }),
);

const mailgunMessageDataSchema = z.toZod<IMailgunMessageData>()(
  z.intersection(
    mailGunMessageContentSchema,
    z
      .strictObject({
        from: z.string().optional(),
        to: arrayableSchema(z.string()).optional(),
        cc: arrayableSchema(z.string()).optional(),
        bcc: arrayableSchema(z.string()).optional(),
        subject: z.string().optional(),
        "amp-html": z.string().optional(),
        attachment: messageAttachmentSchema.optional(),
        // eslint-disable-next-line zod/no-any-schema -- any is the typed used by IMailgunMessageData
        inline: z.any().optional(),
        "t:version": z.string().optional(),
        "t:text": booleanishSchema.optional(),
        "t:variables": z.union([z.string(), jsonObjectSchema]).optional(),
        "o:tag": arrayableSchema(z.string()).optional(),
        "o:dkim": booleanishSchema.optional(),
        "o:deliverytime": z.string().optional(),
        "o:deliverytime-optimize-period": z.string().optional(),
        "o:time-zone-localize": z.string().optional(),
        "o:testmode": booleanishSchema.optional(),
        "o:tracking": booleanishSchema.optional(),
        "o:tracking-clicks": z
          .union([...booleanishSchema.options, z.literal("htmlonly")])
          .optional(),
        "o:tracking-opens": booleanishSchema.optional(),
        "o:require-tls": booleanishSchema.optional(),
        "o:skip-verification": booleanishSchema.optional(),
        "recipient-variables": z.string().optional(),
        "h:X-My-Header": z.string().optional(),
        "v:my-var": z.string().optional(),
      })
      .catchall(formDataInputValueSchema),
  ),
);
type MailgunMessageData = z.infer<typeof mailgunMessageDataSchema>;

const messagesCreateRequestParamsSchema = z.strictObject({
  domain: z.string(),
  data: mailgunMessageDataSchema,
});
type MessagesCreateRequestParams = z.infer<
  typeof messagesCreateRequestParamsSchema
>;

const messagesCreateResponseSchema = z.toZod<IMessagesSendResult>()(
  z.strictObject({
    id: z.string().optional(),
    message: z.string().optional(),
    status: z.number(),
    details: z.string().optional(),
  }),
);
type MessagesCreateResponse = z.infer<typeof messagesCreateResponseSchema>;

export {
  mailgunMessageDataSchema,
  type MailgunMessageData,
  messagesCreateRequestParamsSchema,
  type MessagesCreateRequestParams,
  messagesCreateResponseSchema,
  type MessagesCreateResponse,
};
