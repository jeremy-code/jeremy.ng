import { TRPCError } from "@trpc/server";
import { ofetch } from "ofetch";

import {
  npmSearchRequestParamsSchema,
  npmSearchResponseSchema,
  type NpmSearchResponse,
} from "../schemas/npm/search";
import { baseProcedure, createTRPCRouter } from "../trpc";

const npmRegistryApi = ofetch.create({
  baseURL: "https://registry.npmjs.org",
});

const npmRouter = createTRPCRouter({
  // https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
  // https://api-docs.npmjs.com/#tag/Search
  search: baseProcedure
    .input(npmSearchRequestParamsSchema)
    .output(npmSearchResponseSchema)
    .query(async (opts) => {
      const searchResponse = await npmRegistryApi<NpmSearchResponse>(
        "-/v1/search",
        {
          method: "GET",
          query: opts.input,
          onResponseError: ({ response, error }) => {
            if (response.status === 400) {
              throw new TRPCError({
                message: "A required parameter was missing",
                code: "BAD_REQUEST",
                cause: error,
              });
            }
          },
        },
      );

      // Descending order
      return {
        ...searchResponse,
        objects: searchResponse.objects.toSorted(
          (a, b) => b.downloads.weekly - a.downloads.weekly,
        ),
      };
    }),
});

export { npmRouter };
