import * as z from "zod";

const npmPublisherSchema = z.object({
  email: z.email(),
  approver: z
    .object({
      name: z.string(),
      email: z.email(),
    })
    .optional(),
  actor: z
    .object({
      name: z.string(),
      type: z.literal("user"),
      email: z.email(),
    })
    .optional(),
  trustedPublisher: z
    .object({
      oidcConfigId: z.string(),
      id: z.literal("github"),
    })
    .optional(),
  username: z.string(),
});

const npmPackageSchema = z.object({
  name: z.string(),
  scope: z.string().optional(),
  keywords: z.array(z.string()),
  version: z.string(),
  description: z.string().optional(),
  sanitized_name: z.string(),
  publisher: npmPublisherSchema,
  maintainers: z.array(
    z.object({
      email: z.email(),
      username: z.string(),
    }),
  ),
  license: z.string().optional(),
  date: z.iso.datetime(),
  links: z.object({
    homepage: z.url().optional(),
    repository: z.url().optional(),
    bugs: z.url().optional(),
    npm: z.url({
      protocol: /^https$/,
      hostname: /^www.npmjs.com$/,
    }),
  }),
});

const npmSearchObjectSchema = z.object({
  downloads: z.object({
    monthly: z.int().min(0),
    weekly: z.int().min(0),
  }),
  dependents: z.coerce.number(),
  updated: z.iso.datetime(),
  searchScore: z.number().min(0),
  package: npmPackageSchema,
  score: z.object({
    final: z.number().min(0),
    detail: z.object({
      quality: z.number().min(0).max(1),
      popularity: z.number().min(0).max(1),
      maintenance: z.number().min(0).max(1),
    }),
  }),
  flags: z.object({
    insecure: z.literal([0, 1]),
  }),
});
type NpmSearchObject = z.infer<typeof npmSearchObjectSchema>;

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
const npmSearchResponseSchema = z.object({
  objects: z.array(npmSearchObjectSchema),
  total: z.int().min(0),
  time: z.iso.datetime(),
});
type NpmSearchResponse = z.infer<typeof npmSearchResponseSchema>;

const npmSearchRequestParamsSchema = z.object({
  // Accepting user input, trim string
  text: z.string().trim().optional(),
  size: z.int().max(250).optional(), // defaults to 20
  from: z.int().optional(),
  quality: z.number().min(0).max(1).optional(),
  popularity: z.number().min(0).max(1).optional(),
  maintenance: z.number().min(0).max(1).optional(),
});

export {
  npmSearchObjectSchema,
  type NpmSearchObject,
  npmSearchResponseSchema,
  type NpmSearchResponse,
  npmSearchRequestParamsSchema,
};
