import * as z from "zod";

/**
 * @see {@link https://docs.joinmastodon.org/entities/Role/}
 */
const accountRoleSchema = z.object({
  color: z.string(),
  id: z.string(),
  name: z.string(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/CustomEmoji/}
 */
const customEmojiSchema = z.object({
  shortcode: z.string(),
  static_url: z.url(),
  url: z.url(),
  visible_in_picker: z.boolean(),
  category: z.string().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/FilterKeyword/}
 */
const filterKeywordSchema = z.object({
  id: z.string(),
  keyword: z.string(),
  whole_word: z.boolean(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/FilterStatus/}
 */
const filterStatusSchema = z.object({
  id: z.string(),
  status_id: z.string(),
});

/**
 * @see {@link mediaAttachmentSchema}
 */
const metaDetailsSchema = z.object({
  aspect: z.number().nullish(),
  bitrate: z.int().nullish(),
  duration: z.number().nullish(),
  frame_rate: z.string().nullish(),
  height: z.int().nullish(),
  width: z.int().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Poll/}
 */
const pollSchema = z.object({
  emojis: z.array(customEmojiSchema),
  expired: z.boolean(),
  id: z.string(),
  multiple: z.boolean(),
  options: z.array(
    z.object({
      title: z.string(),
      votes_count: z.int().nullish(),
    }),
  ),
  votes_count: z.int(),
  expires_at: z.iso.datetime().nullish(),
  own_votes: z.array(z.int()).nullish(),
  voted: z.boolean().nullish(),
  voters_count: z.int().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/ShallowTag/}
 */
const shallowTagSchema = z.object({
  name: z.string(),
  url: z.url(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Status/#Mention}
 */
const statusMentionSchema = z.object({
  acct: z.string(),
  id: z.string(),
  url: z.url(),
  username: z.string(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Status/#Tag}
 */
const statusTagSchema = z.object({
  name: z.string(),
  url: z.url(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Collection/}
 */
const collectionSchema = z.object({
  account_id: z.string(),
  created_at: z.iso.datetime(),
  description: z.string(),
  discoverable: z.boolean(),
  id: z.string(),
  item_count: z.int(),
  items: z.array(
    z.object({
      created_at: z.iso.datetime(),
      id: z.string(),
      state: z.enum(["pending", "accepted"]),
      account_id: z.string().nullish(),
    }),
  ),
  local: z.boolean(),
  name: z.string(),
  sensitive: z.boolean(),
  updated_at: z.iso.datetime(),
  uri: z.url(),
  language: z.string().nullish(),
  tag: shallowTagSchema.nullish(),
  url: z.url().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/FeatureApproval/}
 */
const featureApprovalSchema = z.object({
  automatic: z.array(
    z.enum([
      "public",
      "followers",
      "following",
      "unsupported_policy",
      "disabled",
    ]),
  ),
  current_user: z.enum(["automatic", "manual", "denied", "unknown", "missing"]),
  manual: z.array(
    z.enum(["public", "followers", "following", "unsupported_policy"]),
  ),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Account/}
 */
const accountSchema = z.object({
  acct: z.string(),
  avatar: z.url(),
  avatar_static: z.url(),
  bot: z.boolean(),
  created_at: z.iso.datetime(),
  display_name: z.string(),
  emojis: z.array(customEmojiSchema),
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      verified_at: z.iso.datetime({ offset: true }).nullish(),
    }),
  ),
  followers_count: z.int(),
  following_count: z.int(),
  group: z.boolean(),
  header: z.url(),
  header_static: z.url(),
  id: z.string(),
  locked: z.boolean(),
  note: z.string(),
  statuses_count: z.int(),
  uri: z.url(),
  username: z.string(),
  avatar_description: z.string().nullish(),
  discoverable: z.boolean().nullish(),
  feature_approval: featureApprovalSchema.nullish(),
  header_description: z.string().nullish(),
  hide_collections: z.boolean().nullish(),
  indexable: z.boolean().nullish(),
  last_status_at: z.iso.date().nullish(),
  limited: z.boolean().nullish(),
  memorial: z.boolean().nullish(),
  get moved() {
    return accountSchema.nullish();
  },
  noindex: z.boolean().nullish(),
  roles: z.array(accountRoleSchema).nullish(),
  show_featured: z.boolean().nullish(),
  show_media: z.boolean().nullish(),
  show_media_replies: z.boolean().nullish(),
  suspended: z.boolean().nullish(),
  url: z.url().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/FilterResult/}
 */
const filterResultSchema = z.object({
  filter: z.object({
    context: z.array(
      z.enum(["home", "notifications", "public", "thread", "account"]),
    ),
    filter_action: z.enum(["warn", "hide", "blur"]),
    id: z.string(),
    title: z.string(),
    expires_at: z.iso.datetime().nullish(),
    keywords: z.array(filterKeywordSchema).nullish(),
    statuses: z.array(filterStatusSchema).nullish(),
  }),
  keyword_matches: z.array(z.string()).nullish(),
  status_matches: z.array(z.string()).nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/MediaAttachment/}
 */
const mediaAttachmentSchema = z.object({
  id: z.string(),
  type: z.enum(["unknown", "image", "gifv", "video", "audio"]),
  blurhash: z.string().nullish(),
  description: z.string().nullish(),
  meta: z
    .object({
      small: metaDetailsSchema.nullish(),
      original: metaDetailsSchema.nullish(),
      focus: z
        .object({
          x: z.number().nullish(),
          y: z.number().nullish(),
        })
        .nullish(),
    })
    .nullish(),
  preview_url: z.url().nullish(),
  remote_url: z.url().nullish(),
  url: z.url().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/PreviewCard/}
 */
const previewCardSchema = z.object({
  description: z.string(),
  embed_url: z.union([z.literal(""), z.url()]),
  height: z.int(),
  html: z.string(),
  provider_name: z.string(),
  provider_url: z.union([z.literal(""), z.url()]),
  title: z.string(),
  type: z.enum(["link", "photo", "video", "rich"]),
  url: z.url(),
  width: z.int(),
  author_name: z.string().nullish(),
  author_url: z.union([z.literal(""), z.url()]).nullish(),
  authors: z
    .array(
      z.object({
        name: z.string(),
        url: z.union([z.literal(""), z.url()]),
        account: accountSchema.nullish(),
      }),
    )
    .nullish(),
  blurhash: z.string().nullish(),
  image: z.url().nullish(),
  missing_attribution: z.boolean().nullish(),
});

/**
 * @see {@link shallowQuoteSchema} and {@link quoteSchema}
 */
const quoteStateSchema = z.enum([
  "pending",
  "accepted",
  "rejected",
  "revoked",
  "deleted",
  "unauthorized",
  "blocked_account",
  "blocked_domain",
  "muted_account",
]);

/**
 * @see {@link https://docs.joinmastodon.org/entities/ShallowQuote/}
 */
const shallowQuoteSchema = z.object({
  state: quoteStateSchema,
  quoted_status_id: z.string().nullish(),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/QuoteApproval/}
 */
const quoteApprovalSchema = z.object({
  automatic: z.array(
    z.enum(["public", "followers", "following", "unsupported_policy"]),
  ),
  manual: z.array(
    z.enum(["public", "followers", "following", "unsupported_policy"]),
  ),
  current_user: z.enum(["automatic", "manual", "denied", "unknown"]),
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Quote/}
 */
const quoteSchema = z.object({
  state: quoteStateSchema,
  get quoted_status() {
    return statusSchema.nullish();
  },
});

/**
 * @see {@link https://docs.joinmastodon.org/entities/Status/}
 */
const statusSchema = z.object({
  account: accountSchema,
  content: z.string(),
  created_at: z.iso.datetime(),
  emojis: z.array(customEmojiSchema),
  favourites_count: z.int(),
  id: z.string(),
  media_attachments: z.array(mediaAttachmentSchema),
  mentions: z.array(statusMentionSchema),
  reblogs_count: z.int(),
  replies_count: z.int(),
  sensitive: z.boolean(),
  spoiler_text: z.string(),
  tags: z.array(statusTagSchema),
  uri: z.string(),
  visibility: z.enum(["public", "unlisted", "private", "direct"]),
  application: z
    .object({
      name: z.string(),
      website: z.url().nullish(),
    })
    .nullish(),
  bookmarked: z.boolean().nullish(),
  card: previewCardSchema.nullish(),
  edited_at: z.iso.datetime().nullish(),
  favourited: z.boolean().nullish(),
  filtered: z.array(filterResultSchema).nullish(),
  in_reply_to_account_id: z.string().nullish(),
  in_reply_to_id: z.string().nullish(),
  language: z.string().nullish(),
  muted: z.boolean().nullish(),
  pinned: z.boolean().nullish(),
  poll: pollSchema.nullish(),
  quote: z.union([quoteSchema, shallowQuoteSchema]).nullish(),
  quote_approval: quoteApprovalSchema.nullish(),
  quotes_count: z.int().nullish(),
  get reblog() {
    return statusSchema.nullish();
  },
  reblogged: z.boolean().nullish(),
  tagged_collections: z.array(collectionSchema).nullish(),
  text: z.string().nullish(),
  url: z.url().nullish(),
});

type Status = z.infer<typeof statusSchema>;

const statusWithRepliesSchema = statusSchema.extend({
  get replies() {
    return z.array(statusWithRepliesSchema);
  },
});
type StatusWithReplies = z.infer<typeof statusWithRepliesSchema>;

const contextSchema = z.object({
  ancestors: z.array(statusSchema),
  descendants: z.array(statusSchema),
});
type Context = z.infer<typeof contextSchema>;

export {
  statusSchema,
  type Status,
  statusWithRepliesSchema,
  type StatusWithReplies,
  contextSchema,
  type Context,
};
