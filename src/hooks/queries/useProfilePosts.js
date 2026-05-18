import { useInfiniteQuery }
from "@tanstack/react-query";

import {
  getUserPosts,
} from "../../services/communityServices";

export function useProfilePosts(
  profileId
) {
  return useInfiniteQuery({
    queryKey: [
      "profile-posts",
      profileId,
    ],

    queryFn: ({ pageParam = 1 }) =>
      getUserPosts(profileId, pageParam),

    initialPageParam: 1,

    getNextPageParam: (
      lastPage,
      allPages
    ) => {

      if (lastPage.length < 10) {
        return undefined;
      }

      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 10,
  });
}