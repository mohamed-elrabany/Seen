import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllNotifications } from "../../services/notificationServices"; // Make sure to export this service

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. Call your service to clear notifications from the database
    mutationFn: deleteAllNotifications,

    // 2. Optimistic Update: Instantly clear the list in the UI
    onMutate: async () => {
      // Cancel outgoing refetches so they don't overwrite our optimistic state
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      // Snapshot current cache state for rollback safety
      const previousData = queryClient.getQueryData(["notifications"]);

      // Optimistically wipe out the cached data structure
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          unread_count: 0,      // Instantly drop counter to 0
          notifications: [],    // Empty out the notification list completely
        };
      });

      // Return context for potential rollbacks
      return { previousData };
    },

    // 3. If the backend request fails, restore the snapshot
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notifications"], context.previousData);
      }
    },

    // 4. Always refetch in the background to guarantee accuracy
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};