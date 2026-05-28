import { useMutation } from "@tanstack/react-query";
import { editMessage } from "../../services/chatsServices";

export function useEditMessage() {
  return useMutation({
    mutationFn: ({ message_id, message }) => editMessage(message_id, message),
  });
}