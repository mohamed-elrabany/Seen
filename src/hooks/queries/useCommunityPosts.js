import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsData } from "../../services/communityServices";

export function useCommunityPosts(category) {
  return useInfiniteQuery({
    queryKey: ["community-posts", category],

    queryFn: ({ pageParam = 1 }) =>
      getPostsData(category, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // lastPage = array of posts

      if (!Array.isArray(lastPage)) {
        return undefined;
      }

      // STOP condition
      if (lastPage.length < 10) {
        return undefined;
      }

      // NEXT page
      return allPages.length + 1;
    },

    staleTime: 0,
  });
}