import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsRead } from "../../services/notificationServices";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) => markAsRead(notificationId),

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      // Snapshot the previous wrapper object
      const previousData = queryClient.getQueryData(["notifications"]);

      // Optimistically update the wrapped structure
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData || !oldData.notifications) return oldData;

        // Check if the targeted notification was unread so we know if we should decrement count
        const target = oldData.notifications.find(n => n.notification_id === notificationId);
        const wasUnread = target && !target.is_read;

        return {
          ...oldData,
          // Safely decrement unread_count by 1 if it was unread
          unread_count: wasUnread ? Math.max(0, oldData.unread_count - 1) : oldData.unread_count,
          // Map over the nested array matching with notification_id
          notifications: oldData.notifications.map((notification) =>
            notification.notification_id === notificationId
              ? { ...notification, is_read: true }
              : notification
          ),
        };
      });

      return { previousData };
    },

    onError: (err, notificationId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notifications"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};