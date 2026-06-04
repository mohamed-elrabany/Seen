import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNotifications } from "../../hooks/notifications/useNotifications";
import NotificationToast from "./NotificationToast";

export default function NotificationListener() {
  const { data } = useNotifications();
  const maxSeenIdRef = useRef(null);

  const notifications = data?.notifications || [];

  useEffect(() => {
    if (notifications.length === 0) return;

    // 1. Initial run: Mark existing notifications as seen so they don't toast on page load
    if (maxSeenIdRef.current === null) {
      maxSeenIdRef.current = Math.max(
        ...notifications.map((n) => n.notification_id || 0),
      );
      return;
    }

    // 2. Identify new backend entries
    const newNotifications = notifications.filter(
      (n) => n.notification_id > maxSeenIdRef.current,
    );

    // 3. Fire the custom toast component for every incoming notification
    newNotifications.forEach((newNotification) => {
      toast.custom(
        (t) => <NotificationToast t={t} notification={newNotification} />,
        {
          position: "bottom-right", // <-- This overrides the global setting just for this toast!
          duration: 5000,
        },
      );
    });

    // 4. Reset counter checkpoint
    maxSeenIdRef.current = Math.max(
      ...notifications.map((n) => n.notification_id || 0),
    );
  }, [notifications]);

  return null; // This component doesn't render any UI elements directly
}
