// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../services/api"; // Adjust this path to match your axios instance location

// // Temporary service function until you confirm with the backend team
// const deleteNotificationApi = async (notificationId) => {
//   const response = await api.delete(`/notifications/${notificationId}`);
//   return response.data;
// };

// export const useDeleteNotification = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (notificationId) => deleteNotificationApi(notificationId),

//     // Optimistic Update: Instantly remove the item from the list
//     onMutate: async (notificationId) => {
//       // Cancel outgoing refetches so they don't overwrite our optimistic state
//       await queryClient.cancelQueries({ queryKey: ["notifications"] });

//       // Snapshot current cache state for rollback safety
//       const previousData = queryClient.getQueryData(["notifications"]);

//       // Optimistically modify the cached structure
//       queryClient.setQueryData(["notifications"], (oldData) => {
//         if (!oldData || !oldData.notifications) return oldData;

//         // Find out if the deleted notification was unread so we can update the count too
//         const target = oldData.notifications.find(n => n.notification_id === notificationId);
//         const wasUnread = target && !target.is_read;

//         return {
//           ...oldData,
//           // Decrement unread_count by 1 ONLY if the deleted notification was unread
//           unread_count: wasUnread ? Math.max(0, oldData.unread_count - 1) : oldData.unread_count,
//           // Filter out the deleted notification entirely from the UI array
//           notifications: oldData.notifications.filter(
//             (notification) => notification.notification_id !== notificationId
//           ),
//         };
//       });

//       // Return context for potential rollbacks
//       return { previousData };
//     },

//     // If the backend request fails, instantly put the notification back in place
//     onError: (err, notificationId, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(["notifications"], context.previousData);
//       }
//     },

//     // Refetch in the background to ensure absolute sync with the database
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["notifications"] });
//     },
//   });
// };