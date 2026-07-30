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
import { booleanishSchema } from "../common/booleanish";
import { jsonObjectSchema } from "../common/jsonObject";

const mimeMessageSchema = z.union([
  z.string(),
  z.instanceof(Blob),
  z.instanceof(Buffer),
  z.instanceof(Readable),
]) satisfies z.ZodType<IMimeMessage>;

const customFileDataSchema = z.union([
  ...mimeMessageSchema.options,
  z.instanceof(File),
]) satisfies z.ZodType<ICustomFileData>;

const customFileSchema = z
  .strictObject({
    data: customFileDataSchema,
    filename: z.string().optional(),
    contentType: z.string().optional(),
    knownLength: z.number().optional(),
  })
  .catchall(z.unknown()) satisfies z.ZodType<ICustomFile>;

const messageAttachmentSchema = z.union([
  ...arrayableSchema(customFileSchema).options,
  ...arrayableSchema(z.instanceof(File)).options,
  z.string(),
  ...arrayableSchema(customFileDataSchema).options,
]) satisfies z.ZodType<IMessageAttachment>;

const formDataInputValueSchema = z.union([
  mimeMessageSchema,
  customFileDataSchema,
  ...arrayableSchema(z.string()).options,
  z.boolean(),
  messageAttachmentSchema,
  z.undefined(),
  z.number(),
  jsonObjectSchema,
]) satisfies z.ZodType<IFormDataInputValue>;

const isMailgunMessageContent = (
  content: unknown,
): content is IMailgunMessageContent =>
  content !== null &&
  typeof content === "object" &&
  ("text" in content ||
    "html" in content ||
    "message" in content ||
    "template" in content);

const mailGunMessageContentSchema = z
  .strictObject({
    text: z.string().optional(),
    html: z.string().optional(),
    message: mimeMessageSchema.optional(),
    template: z.string().optional(),
  })
  .refine(isMailgunMessageContent, {
    error:
      "At least one of 'text', 'html', 'message', or 'template' must be provided.",
  }) satisfies z.ZodType<IMailgunMessageContent>;

const mailgunMessageDataSchema = z.intersection(
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
  // Type cast because AtLeastOneKeyPresent creates a union of all possible keys,
  // which would be excessively verbose and inefficient. The actual output is
  // structurally identical to IMailgunMessageContent.
) as z.ZodType<IMailgunMessageData>;
type MailgunMessageData = z.infer<typeof mailgunMessageDataSchema>;

const messagesCreateRequestParamsSchema = z.strictObject({
  domain: z.string(),
  data: mailgunMessageDataSchema,
});
type MessagesCreateRequestParams = z.infer<
  typeof messagesCreateRequestParamsSchema
>;

const messagesCreateResponseSchema = z.strictObject({
  id: z.string().optional(),
  message: z.string().optional(),
  status: z.number(),
  details: z.string().optional(),
}) satisfies z.ZodType<IMessagesSendResult>;
type MessagesCreateResponse = z.infer<typeof messagesCreateResponseSchema>;

export {
  mailgunMessageDataSchema,
  type MailgunMessageData,
  messagesCreateRequestParamsSchema,
  type MessagesCreateRequestParams,
  messagesCreateResponseSchema,
  type MessagesCreateResponse,
};
