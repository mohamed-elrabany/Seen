import { updatePostInInfiniteData } from "./updatePostInInfiniteData";
import { toggleLikeUpdater } from "./toggleLikeUpdater";

export const updateAllPostCaches = (queryClient, postId) => {
  const id = Number(postId);
  if (!Number.isFinite(id)) return;

  const updater = toggleLikeUpdater(id);

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