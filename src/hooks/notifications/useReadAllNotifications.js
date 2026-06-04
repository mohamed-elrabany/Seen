import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAllNotifications } from "../../services/notificationServices";

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      // Snapshot the previous wrapper object
      const previousData = queryClient.getQueryData(["notifications"]);

      // Optimistically update the wrapped structure
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData || !oldData.notifications) return oldData;

        return {
          ...oldData,
          unread_count: 0, // Instantly set counter to 0
          notifications: oldData.notifications.map((notification) => ({
            ...notification,
            is_read: true, // Mark all items read
          })),
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notifications"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};