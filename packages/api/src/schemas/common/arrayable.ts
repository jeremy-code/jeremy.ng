import * as z from "zod";

const arrayableSchema = <const T extends z.ZodType>(
  element: T,
  params?: Parameters<typeof z.union>[1],
) => z.union([element, z.array(element)], params);

export { arrayableSchema };
