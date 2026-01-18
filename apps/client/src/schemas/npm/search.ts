import { z, regexes } from "zod";

const NpmSearchObjectSchema = z.strictObject({
  downloads: z.strictObject({
    monthly: z.int().min(0),
    weekly: z.int().min(0),
  }),
  dependents: z.coerce.number(),
  updated: z.iso.datetime(),
  searchScore: z.number().min(0),
  package: z.strictObject({
    name: z.string(),
    scope: z.string().optional(),
    keywords: z.array(z.string()),
    version: z.string(),
    description: z.string().optional(),
    sanitized_name: z.string(),
    publisher: z.strictObject({
      email: z.email(),
      actor: z
        .strictObject({
          name: z.string(),
          type: z.literal("user"),
          email: z.email(),
        })
        .optional(),
      trustedPublisher: z
        .strictObject({
          oidcConfigId: z
            .string()
            .startsWith("oidc:")
            .superRefine((val, ctx) => {
              if (!regexes.uuid4.test(val.substring("oidc:".length))) {
                ctx.addIssue({
                  origin: "string",
                  code: "invalid_format",
                  format: "uuid",
                  pattern: regexes.uuid4.toString(),
                  message: "Invalid UUID",
                });
              }
            }),
          id: z.literal("github"),
        })
        .optional(),
      username: z.string(),
    }),
    maintainers: z.array(
      z.strictObject({
        email: z.email(),
        username: z.string(),
      }),
    ),
    license: z.string().optional(),
    date: z.iso.datetime(),
    links: z.strictObject({
      homepage: z.url().optional(),
      repository: z.url().optional(),
      bugs: z.url().optional(),
      npm: z.url({
        protocol: /^https$/,
        hostname: /^www.npmjs.com$/,
      }),
    }),
  }),
  score: z.strictObject({
    final: z.number().min(0),
    detail: z.strictObject({
      quality: z.number().min(0).max(1),
      popularity: z.number().min(0).max(1),
      maintenance: z.number().min(0).max(1),
    }),
  }),
  flags: z.strictObject({
    insecure: z.literal([0, 1]),
  }),
});
export type NpmSearchObjectSchema = z.infer<typeof NpmSearchObjectSchema>;

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
export const NpmSearchResponseSchema = z.strictObject({
  objects: z.array(NpmSearchObjectSchema),
  total: z.int().min(0),
  time: z.iso.datetime(),
});
export type NpmSearchResponseSchema = z.infer<typeof NpmSearchResponseSchema>;

export const NpmSearchParamsSchema = z.strictObject({
  text: z.string().optional(),
  size: z.int().max(250).optional(), // defaults to 20
  from: z.int().optional(),
  quality: z.number().min(0).max(1).optional(),
  popularity: z.number().min(0).max(1).optional(),
  maintenance: z.number().min(0).max(1).optional(),
});
