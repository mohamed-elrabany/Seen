import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askChatbot } from "../../services/assistantServices";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: askChatbot,

    onMutate: async (message) => {
      await queryClient.cancelQueries({ queryKey: ["chatbot", "history"] });
      const previous = queryClient.getQueryData(["chatbot", "history"]);

      queryClient.setQueryData(["chatbot", "history"], (old = []) => [
        ...old,
        { role: "user", content: message },
      ]);

      return { previous };
    },

    onSuccess: (botMessage) => {
      queryClient.setQueryData(["chatbot", "history"], (old = []) => [
        ...old,
        { role: "assistant", content: botMessage },
      ]);
    },

    onError: (_err, _msg, context) => {
      queryClient.setQueryData(["chatbot", "history"], context.previous);
    },
  });
};