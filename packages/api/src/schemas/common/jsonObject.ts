import type { JsonObject as IJsonObject } from "mailgun.js/definitions";
import * as z from "zod";

const jsonObjectSchema = z.toZod<IJsonObject>()(z.record(z.string(), z.json()));

export { jsonObjectSchema };
