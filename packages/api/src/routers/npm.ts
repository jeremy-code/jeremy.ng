import ky from "ky";

import { NpmSearchParams, NpmSearchResponse } from "../schemas/npm/search";
import { baseProcedure, createTRPCRouter } from "../trpc";

const npmRegistryApi = ky.extend({
  baseUrl: "https://registry.npmjs.org/",
});

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
const npmRouter = createTRPCRouter({
  search: baseProcedure
    .input(NpmSearchParams)
    .output(NpmSearchResponse)
    .query((opts) => {
      const response = npmRegistryApi
        .get("-/v1/search", {
          searchParams: opts.input,
        })
        .json<NpmSearchResponse>();

      return response;
    }),
});

export { npmRouter };
