import { z } from "zod";

const Language = z.strictObject({
  color: z.string().nullable(),
  id: z.string(),
  name: z.string(),
});
type Language = z.infer<typeof Language>;

const License = z.strictObject({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  spdxId: z.string().nullable(),
  url: z.url().nullable(),
});
type License = z.infer<typeof License>;

const Repository = z.strictObject({
  __typename: z.literal("Repository"),
  createdAt: z.iso.datetime(),
  id: z.string(),
  name: z.string(),
  nameWithOwner: z.string(),
  stargazerCount: z.int32(),
  updatedAt: z.iso.datetime(),
  url: z.url(),
  description: z.string().nullable(),
  homepageUrl: z.string().nullable(),
  licenseInfo: License.nullable(),
  primaryLanguage: Language.nullable(),
  pushedAt: z.iso.datetime().nullable(),
});
type Repository = z.infer<typeof Repository>;

export { Repository, Language, License };
