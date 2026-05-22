// util/updateAllPostCommentCaches.js
import { updatePostInInfiniteData } from "./updatePostInInfiniteData";
import { commentCountUpdater } from "./commentCountUpdater";

export const updateAllPostCommentCaches = (queryClient, postId, delta) => {
  const id = Number(postId);
  if (!Number.isFinite(id)) return;

  const updater = commentCountUpdater(id, delta);

  queryClient.setQueriesData(
    { queryKey: ["community-posts"] },
    (old) => updatePostInInfiniteData(old, id, updater)
  );

  queryClient.setQueriesData(
    { queryKey: ["profile-posts"] },
    (old) => updatePostInInfiniteData(old, id, updater)
  );

  queryClient.setQueryData(["post", id], (old) => updater(old));
};