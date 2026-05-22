export function updatePostInInfiniteData(oldData, postId, updater) {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) =>
      page.map((post) =>
        post.id === postId ? updater(post) : post
      )
    ),
  };
}