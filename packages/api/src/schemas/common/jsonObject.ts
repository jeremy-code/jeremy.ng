import type { JsonObject as IJsonObject } from "mailgun.js/definitions";
import * as z from "zod";

const jsonObjectSchema = z.record(
  z.string(),
  z.json(),
) satisfies z.ZodType<IJsonObject>;

export { jsonObjectSchema };
