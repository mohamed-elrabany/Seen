import { MdNotifications } from "react-icons/md";
import IconHeader from "../../components/ui/IconHeader";
import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/empty-notification.svg";
import NotificationCard from "../../components/notifications/NotificationCard";

import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useReadNotification } from "../../hooks/notifications/useReadNotification";
import { useReadAllNotifications } from "../../hooks/notifications/useReadAllNotifications";
// import { useDeleteNotifications } from "../../hooks/notifications/useDeleteNotifications";

export default function Notifications() {
  // 1. Destructure 'data' from the query hook
  const { data, isLoading, isError } = useNotifications();
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAll } = useReadAllNotifications();
//   const { mutate: deleteNotification } = useDeleteNotification();

  // 2. Handle Loading and Error states gracefully
  if (isLoading) {
    return <div className="text-center py-20 text-gray-500">جاري التحميل...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        حدث خطأ ما أثناء تحميل الإشعارات. يرجى المحاولة مرة أخرى.
      </div>
    );
  }

  // 3. Extract the nested notifications array and unread count safely
  const notificationList = data?.notifications || [];
  const unreadCount = data?.unread_count || 0;

  return (
    <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
    <IconHeader icon={MdNotifications} title={`الإشعارات (${unreadCount})`} />
        
      {/* 4. Check against the extracted array */}
      {notificationList.length === 0 ? (
        <EmptyIllustration
          imageSrc={emptyImg}
          title="لا توجد إشعارات"
          description="سنقوم بإعلامك فور وصول أي تحديثات أو تنبيهات جديدة."
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
            //   onDelete={() => deleteNotification(n.notification_id)}
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