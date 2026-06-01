import { useQuery } from "@tanstack/react-query";
import { chatbotHistory } from "../../services/assistantServices";

export const useChatHistory = () => {
  return useQuery({
    queryKey: ["chatbot", "history"],
    queryFn: chatbotHistory,
    staleTime: Infinity,
  });
};