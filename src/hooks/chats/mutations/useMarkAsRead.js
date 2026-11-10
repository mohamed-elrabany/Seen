import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead } from "../../../services/chatsServices";

export function useMarkAsRead(receiverId, conversationId) {
  const queryClient = useQueryClient();
  const queryKey = ["messages", receiverId];

  return useMutation({
    mutationFn: () => markAsRead(conversationId),

    onSuccess: () => {
      // locally flip messages FROM the other person to "read"
      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return old;
        const pages = old.pages.map((page) => ({
          ...page,
          data: page.data.map((msg) =>
            msg.sender_id === receiverId ? { ...msg, is_read: true } : msg
          ),
        }));
        return { ...old, pages };
      });
    },

    onError: (error) => {
      console.error("❌ Mark as read failed:", error.message);
    },
  });
}