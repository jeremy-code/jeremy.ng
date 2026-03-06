import { z } from "zod";

const JsonObject = z.record(z.string(), z.json());

export { JsonObject };
