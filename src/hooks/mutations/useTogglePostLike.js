import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../services/communityServices";
import { updateAllPostCaches } from "../../util/updateAllPostCaches";

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      const id = Number(postId);

      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
      await queryClient.cancelQueries({ queryKey: ["profile-posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", id] });

      updateAllPostCaches(queryClient, id);

      return { postId: id };
    },

    onError: (_err, _postId, context) => {
      const id = context?.postId;

      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      if (Number.isFinite(id)) queryClient.invalidateQueries({ queryKey: ["post", id] });
    },

    onSuccess: (_data, _postId, context) => {
      const id = context?.postId;
      if (Number.isFinite(id)) queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
}