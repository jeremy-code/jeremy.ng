import type { JsonObject as IJsonObject } from "mailgun.js/definitions";
import { z } from "zod";

const JsonObject = z.record(
  z.string(),
  z.json(),
) satisfies z.ZodType<IJsonObject>;

export { JsonObject };
