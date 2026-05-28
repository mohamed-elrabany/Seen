import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../services/chatsServices";

export function useSendMessage() {
  return useMutation({
    mutationFn: ({ receiver_id, message }) => sendMessage(receiver_id, message),
  });
}