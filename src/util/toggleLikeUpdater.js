export const toggleLikeUpdater = (postId) => (post) => {
  if (!post) return post;
  if (post.id !== postId) return post;

  const isLiked = !post.is_liked;

  return {
    ...post,
    is_liked: isLiked,
    likes_count: post.likes_count + (isLiked ? 1 : -1),
  };
};