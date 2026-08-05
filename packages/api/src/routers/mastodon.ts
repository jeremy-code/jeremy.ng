import { TRPCError } from "@trpc/server";
import { ofetch } from "ofetch";
import * as z from "zod";

import { statusSchema, type Status } from "../schemas/mastodon/status";
import { baseProcedure, createTRPCRouter } from "../trpc";

const mastodonApi = ofetch.create({
  baseURL: "https://mastodon.social",
});

const mastodonRouter = createTRPCRouter({
  // https://docs.joinmastodon.org/methods/statuses/#get
  getStatus: baseProcedure
    .input(z.strictObject({ statusId: z.string().trim() }))
    .output(statusSchema)
    .query(async (opts) => {
      const response = await mastodonApi<Status>(
        `/api/v1/statuses/${opts.input.statusId}`,
        {
          method: "GET",
          onResponseError: ({ response, error }) => {
            if (response.status === 401) {
              throw new TRPCError({
                message:
                  "Mastodon server required authorization to fetch status.",
                code: "INTERNAL_SERVER_ERROR",
                cause: error,
              });
            } else if (response.status === 404) {
              throw new TRPCError({
                message: "The status could not be found.",
                code: "NOT_FOUND",
                cause: error,
              });
            }
          },
        },
      );

      return response;
    }),
});

export { mastodonRouter };
