import { useMutation } from "@tanstack/react-query";
import { deleteMessage } from "../../services/chatsServices";

export function useDeleteMessage() {
  return useMutation({
    mutationFn: ({ message_id }) => deleteMessage(message_id),
  });
}