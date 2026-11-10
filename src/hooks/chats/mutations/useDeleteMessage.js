import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../../../services/chatsServices";

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }) => deleteMessage(messageId),

    onMutate: async ({ messageId, receiverId }) => {
      const queryKey = ["messages", Number(receiverId)];

      // Stop any in-flight refetch from clobbering our optimistic change
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: (page.data || []).filter((m) => m.id !== messageId),
          })),
        };
      });

      // Saved so onError can roll back
      return { previousData, queryKey };
    },

    onError: (error, variables, context) => {
      if (context?.queryKey && context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
      console.error("❌ Delete failed:", error.message);
    },
  });
}