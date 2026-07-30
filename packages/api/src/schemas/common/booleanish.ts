import * as z from "zod";

const booleanishSchema = z.union([
  z.boolean(),
  z.templateLiteral([z.boolean()]),
]);

export { booleanishSchema };
