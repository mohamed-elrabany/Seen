import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../services/chatsServices";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ receiver_id, message }) => sendMessage(receiver_id, message),

onSuccess: (data, variables) => {
  console.log("✅ Message sent:", data);

  const queryKey = ["messages", Number(variables.receiver_id)]; // Ensure integer comparison

  queryClient.setQueryData(queryKey, (old) => {
    if (!old || !old.pages) return old;
    
    const pages = [...old.pages];
    const lastPageIndex = pages.length - 1;
    const lastPage = { ...pages[lastPageIndex] };

    // Guard against duplication
    const alreadyExists = lastPage.data?.some((m) => m.id === data.id);
    if (alreadyExists) return old;

    // Notice the exact field mapping from your backend response structure
    lastPage.data = [
      ...(lastPage.data || []),
      {
        id: data.id,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        message: data.message,
        created_at: data.created_at,
        is_read: data.is_read || false
      },
    ];

    pages[lastPageIndex] = lastPage;
    return { ...old, pages };
  });
},
    onError: (error) => {
      console.error("❌ Send failed:", error.message);
    },
  });
}