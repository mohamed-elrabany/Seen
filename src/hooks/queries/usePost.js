import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../../services/communityServices";

export function usePost(postId) {
  const id = Number(postId);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: Number.isFinite(id),

    initialData: () => {
      if (!Number.isFinite(id)) return undefined;

      const communityQueries = queryClient.getQueriesData({
        queryKey: ["community-posts"],
      });

      for (const [, data] of communityQueries) {
        const foundPost = data?.pages?.flat()?.find((post) => post.id === id);
        if (foundPost) return foundPost;
      }

      const profileQueries = queryClient.getQueriesData({
        queryKey: ["profile-posts"],
      });

      for (const [, data] of profileQueries) {
        const foundPost = data?.pages?.flat()?.find((post) => post.id === id);
        if (foundPost) return foundPost;
      }

      return undefined;
    },

    staleTime: 1000 * 60,
  });
}