import { allPosts, type Post } from "#content-collections";

const isPublishedDateReleased = (publishedDate: string, now = new Date()) => {
  return Date.parse(publishedDate) <= now.getTime();
};

const getPublishedPosts = (): Post[] => {
  return allPosts
    .filter(
      (post) => !post.isDraft && isPublishedDateReleased(post.publishedDate),
    )
    .toSorted(
      (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate),
    );
};

export { getPublishedPosts };
