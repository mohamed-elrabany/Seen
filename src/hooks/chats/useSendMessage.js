import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../services/chatsServices";

export function useSendMessage() {
  return useMutation({
    mutationFn: ({ receiver_id, message }) => sendMessage(receiver_id, message),
    onSuccess: (data) => {
      console.log("✅ Message sent:", data);
    },
    onError: (error) => {
      console.error("❌ Send failed:", error.message);
    },
  });
}