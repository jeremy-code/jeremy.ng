import * as z from "zod";

const languageSchema = z.strictObject({
  color: z.string().nullable(),
  id: z.string(),
  name: z.string(),
});
type Language = z.infer<typeof languageSchema>;

const licenseSchema = z.strictObject({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  spdxId: z.string().nullable(),
  url: z.url().nullable(),
});
type License = z.infer<typeof licenseSchema>;

const repositorySchema = z.strictObject({
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
  licenseInfo: licenseSchema.nullable(),
  primaryLanguage: languageSchema.nullable(),
  pushedAt: z.iso.datetime().nullable(),
});
type Repository = z.infer<typeof repositorySchema>;

export {
  repositorySchema,
  type Repository,
  languageSchema,
  type Language,
  licenseSchema,
  type License,
};
