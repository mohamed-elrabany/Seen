// hooks/useCommentCount.js
import { useQueryClient } from "@tanstack/react-query";
import { updateAllPostCommentCaches } from "../../util/community/updateAllPostCommentCaches";

export function useCommentCount() {
  const queryClient = useQueryClient();

  const incrementCommentCount = (postId) => {
    updateAllPostCommentCaches(queryClient, postId, +1);
  };

  const decrementCommentCount = (postId) => {
    updateAllPostCommentCaches(queryClient, postId, -1);
  };

  return { incrementCommentCount, decrementCommentCount };
}