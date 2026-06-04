import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/notificationServices";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    // Lower staleTime so data is considered old quickly
    staleTime: 5000, 
    // Automatically refetch from the server every 10 seconds (10000ms)
    refetchInterval: 10000, 
    // Keeps polling even if the user changes browser tabs
    refetchIntervalInBackground: true, 
  });
};