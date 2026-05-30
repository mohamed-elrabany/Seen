import { MdNotifications } from "react-icons/md";
import IconHeader from "../../components/ui/IconHeader";
import EmptyIllustration from "../../components/ui/EmptyIllustration";
import emptyImg from "../../assets/empty-notification.svg";

import { mockNotifications } from "../../util/content";
import NotificationCard from "../../components/notifications/NotificationCard";
import { useState } from "react";

export default function Notifications() {
    const [notifications, setNotifications] = useState(mockNotifications);

    return (
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <IconHeader icon={MdNotifications} title="الإشعارات" />
            
            {notifications.length === 0 ? (
                <EmptyIllustration 
                    imageSrc={emptyImg} 
                    title="لا توجد إشعارات"
                    description="سنقوم بإعلامك فور وصول أي تحديثات أو تنبيهات جديدة." 
                />
            ) : (
                // Removed the extra curly braces here
                notifications.map((notification, index) => (
                    <NotificationCard 
                        key={notification.id || index} // Preferred using an id if available, fallback to index
                        type={notification.type} 
                        time={notification.time} 
                        {...notification} // Spreads extra dynamic values (senderName, version, etc.)
                    />
                ))
            )}
        </div>
    );
}