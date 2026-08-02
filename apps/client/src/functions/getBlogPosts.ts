import { createServerFn } from "@tanstack/react-start";

import { allPosts, type Post } from "#content-collections";
import { dateCompareFn } from "#utils/dateCompareFn";

/**
 * Sorts in descending order (latest to earliest). Undated blog posts are left
 * the end.
 *
 * For ties, they are based on the original sort order using localeCompare on
 * the slug
 *
 * @see {@link https://github.com/sdorra/content-collections/blob/294b39ca25b9e3cba7dff2b6440a369c218c70c7/packages/core/src/collector.ts#L147-L150}
 */
const getBlogPosts = createServerFn({ method: "POST" }).handler((): Post[] => {
  return allPosts.toSorted(
    (a, b) => -1 * dateCompareFn(a.publishedDate ?? 0, b.publishedDate ?? 0),
  );
});

export { getBlogPosts };
