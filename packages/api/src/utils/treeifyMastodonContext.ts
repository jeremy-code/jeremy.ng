import type {
  Context,
  Status,
  StatusWithReplies,
} from "../schemas/mastodon/status";

/**
 * This function assumes that the parent of any descendant provided in the
 * context also exists in the context (or is the root). Given how the API
 * functions by recursing from the root status, this is true in practice, though
 * is not documented.
 *
 * @see {@link https://docs.joinmastodon.org/entities/Context/}
 * @see {@link https://github.com/mastodon/mastodon/blob/b625f21ceab87556c990344d586a231b6c4559e3/app/controllers/api/v1/statuses/contexts_controller.rb#L35}
 * @see {@link https://github.com/mastodon/mastodon/blob/b625f21ceab87556c990344d586a231b6c4559e3/app/models/concerns/status/threading_concern.rb#L28-L30}
 */
const treeifyMastodonContext = (
  rootStatus: Status,
  context: Context,
): StatusWithReplies => {
  const rootStatusWithReplies: StatusWithReplies = {
    ...rootStatus,
    replies: [],
  };

  const statusById = new Map([
    [rootStatus.id, rootStatusWithReplies],
    ...context.descendants.map(
      (descendant) =>
        [descendant.id, { ...descendant, replies: [] }] as [
          Status["id"],
          StatusWithReplies,
        ],
    ),
  ]);

  statusById.forEach((status) => {
    // Root status, we don't care about ancestors (if there even are any)
    if (status.id === rootStatus.id) {
      return;
    }

    // Since it's not the root, it must be from context.descendants
    if (!status.in_reply_to_id) {
      throw new Error(
        "Somehow, the descendant was not actually a descendant of any status.",
      );
    }

    const parentStatus = statusById.get(status.in_reply_to_id);

    // The parent status does not exist in the array at all
    if (parentStatus === undefined) {
      throw new Error("The parentStatus does not exist in the context.");
    }

    parentStatus.replies.push(status);
  });

  return rootStatusWithReplies;
};

export { treeifyMastodonContext };
