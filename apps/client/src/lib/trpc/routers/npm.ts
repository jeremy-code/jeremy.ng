import ky from "ky";

import {
  NpmSearchParamsSchema,
  NpmSearchResponseSchema,
} from "#schemas/npm/search";

import { baseProcedure, createTRPCRouter } from "../init";

const npmRegistryApi = ky.extend({
  prefixUrl: "https://registry.npmjs.org/",
});

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
export const npmRouter = createTRPCRouter({
  search: baseProcedure
    .input(NpmSearchParamsSchema)
    .output(NpmSearchResponseSchema)
    .query((opts) => {
      const response = npmRegistryApi
        .get("-/v1/search", {
          searchParams: opts.input,
        })
        .json<NpmSearchResponseSchema>();

      return response;
    }),
});
