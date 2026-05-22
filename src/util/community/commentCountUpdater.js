// util/commentCountUpdater.js
export const commentCountUpdater = (postId, delta) => (post) => {
  if (!post || post.id !== postId) return post;

  return {
    ...post,
    comments_count: Math.max(0, (post.comments_count ?? 0) + delta),
  };
};