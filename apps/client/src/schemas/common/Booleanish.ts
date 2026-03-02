import { z } from "zod";

const Booleanish = z.union([z.boolean(), z.templateLiteral([z.boolean()])]);

export { Booleanish };
