import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversations } from "../../services/chatsServices";

export function useConversations() {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam = 1 }) => getConversations(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
    staleTime: 30_000,
    select: (data) => ({
      conversations: data.pages.flatMap((page) => page.data),
      pages: data.pages,
      pageParams: data.pageParams,
    }),
  });
}