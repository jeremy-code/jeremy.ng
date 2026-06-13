import { ofetch } from "ofetch";

import { NpmSearchParams, NpmSearchResponse } from "../schemas/npm/search";
import { baseProcedure, createTRPCRouter } from "../trpc";

const npmRegistryApi = ofetch.create({
  baseURL: "https://registry.npmjs.org",
});

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
const npmRouter = createTRPCRouter({
  search: baseProcedure
    .input(NpmSearchParams)
    .output(NpmSearchResponse)
    .query((opts) => {
      const response = npmRegistryApi<NpmSearchResponse>("-/v1/search", {
        method: "GET",
        query: opts.input,
      });

      return response;
    }),
});

export { npmRouter };
