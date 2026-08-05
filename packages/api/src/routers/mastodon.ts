import { TRPCError } from "@trpc/server";
import { ofetch } from "ofetch";
import * as z from "zod";

import {
  contextSchema,
  statusSchema,
  statusWithRepliesSchema,
  type Context,
  type Status,
} from "../schemas/mastodon/status";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { treeifyMastodonContext } from "../utils/treeifyMastodonContext";

const mastodonApi = ofetch.create({
  baseURL: "https://mastodon.social",
});

const mastodonRouter = createTRPCRouter({
  getStatus: baseProcedure
    .input(z.strictObject({ statusId: z.string().trim() }))
    .output(statusWithRepliesSchema)
    .query(async (opts) => {
      // https://docs.joinmastodon.org/methods/statuses/#get
      const status = statusSchema.parse(
        await mastodonApi<Status>(`/api/v1/statuses/${opts.input.statusId}`, {
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
        }),
      );

      // Context API is expensive, only query if necessary
      // https://github.com/mastodon/mastodon/blob/b625f21ceab87556c990344d586a231b6c4559e3/app/controllers/api/v1/statuses/contexts_controller.rb#L16
      if (status.replies_count === 0) {
        return {
          ...status,
          replies: [],
        };
      }

      // https://docs.joinmastodon.org/methods/statuses/#context
      const context = contextSchema.parse(
        await mastodonApi<Context>(
          `/api/v1/statuses/${opts.input.statusId}/context`,
          {
            method: "GET",
            onResponseError: ({ response, error }) => {
              if (response.status === 404) {
                throw new TRPCError({
                  message: "The status context could not be found.",
                  code: "NOT_FOUND",
                  cause: error,
                });
              }
            },
          },
        ),
      );

      return treeifyMastodonContext(status, context);
    }),
});

export { mastodonRouter };
