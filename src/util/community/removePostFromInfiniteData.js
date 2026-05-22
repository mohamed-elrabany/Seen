export function removePostFromInfiniteData(oldData, postId) {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) => page.filter((post) => post.id !== postId)),
  };
}
