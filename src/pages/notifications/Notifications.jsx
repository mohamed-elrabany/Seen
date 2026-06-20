import { MdNotifications } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbChecks } from "react-icons/tb";

import IconHeader from "../../components/ui/IconHeader";
import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/empty-notification.svg";
import NotificationCard from "../../components/notifications/NotificationCard";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useReadNotification } from "../../hooks/notifications/useReadNotification";
import { useReadAllNotifications } from "../../hooks/notifications/useReadAllNotifications";
import { useDeleteNotification } from "../../hooks/notifications/useDeleteNotification";
import { useDeleteAllNotifications } from "../../hooks/notifications/useDeleteAllNotifications";
import { acceptRequest, cancelRequest } from "../../services/communityServices";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();
  // 1. Destructure 'data' from the query hook
  const { data, isLoading, isError } = useNotifications();
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAll } = useReadAllNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: deleteAll } = useDeleteAllNotifications();

  // 2. Handle Loading and Error states gracefully
  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">جاري التحميل...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        حدث خطأ ما أثناء تحميل الإشعارات. يرجى المحاولة مرة أخرى.
      </div>
    );
  }

  async function handleAcceptRequest(notificationId, userId) {
    // 1. Instantly drop the notification card from the UI optimistically
    deleteNotification(notificationId);

    try {
      // 2. Fire off the backend relationship creation
      await acceptRequest(userId);
      toast.success("Friend request accepted successfully!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Error accepting friend request. Please try again.");

      // Note: Since deleteNotification will auto-restore on failure due to its
      // internal onError snapshot, you don't have to manually roll back the card!
    }
  }

  async function handleReject(notificationId, userId) {
    // 1. Instantly drop the notification card from the UI optimistically
    deleteNotification(notificationId);

    try {
      await cancelRequest(userId);
      toast.success("Friend request rejected!");
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error("Error executing action. Please try again.");
    }
  }

  // 3. Extract the nested notifications array and unread count safely
  const notificationList = data?.notifications || [];
  const unreadCount = data?.unread_count || 0;

  return (
    <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
      <IconHeader icon={MdNotifications} title={t("notifications.title", { count: unreadCount })} />
      <div className="flex justify-center items-center gap-2 w-full">
        <Button
          onClick={() => readAll()}
          className="px-6 py-3 w-full cursor-pointer rounded-xl text-white bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695] bg-[length:200%_auto] bg-left transition-all duration-500 ease-out hover:bg-right active:scale-[0.98]"
        >
          <TbChecks className="w-5 h-5" />
          <p>{t("notifications.markAllAsRead")}</p>
        </Button>
        <Button
          onClick={() => deleteAll()}
          className="px-6 py-3 w-full flex justify-start items-center gap-2 cursor-pointer text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
        >
          <RiDeleteBin6Line className="w-5 h-5" />
          <p>{t("notifications.deleteAll")}</p>
        </Button>
      </div>

      {/* 4. Check against the extracted array */}
      {notificationList.length === 0 ? (
        <EmptyIllustration
          imageSrc={emptyImg}
          title={t("notifications.empty.title")}
          description={t("notifications.empty.description")}
        />
      ) : (
        <div className="space-y-4">
          {notificationList.map((n, index) => (
            <NotificationCard
              key={n.notification_id || index}
              type={n.type}
              time={n.created_at}
              is_read={n.is_read}
              extraData={n.extra_data}
              onDelete={() => deleteNotification(n.notification_id)}
              acceptRequest={() =>
                handleAcceptRequest(n.notification_id, n.reference_id)
              }
              rejectRequest={() =>
                handleReject(n.notification_id, n.reference_id)
              }
              markAsRead={() => {
                if (!n.is_read) {
                  readNotification(n.notification_id);
                }
              }}
              {...n}
            />
          ))}
        </div>
      )}
    </div>
  );
}
