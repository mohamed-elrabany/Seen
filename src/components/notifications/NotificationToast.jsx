import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { PiChatCircleTextBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import GlucoseIcon from "../ui/GlucoseIcon";
import CommunityIcon from "../ui/CommunityIcon";

export default function NotificationToast({ t, notification }) {
  const theme = useSelector((state) => state.theme.theme);
  const isDarkMode = theme === "dark";
  const { t: translate, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.dir() === "rtl";

  const cardContent = {
    like: {
      icon: FaHeart,
      title: translate("notifications.like.title"),
      description: translate("notifications.like.description", {
        name: notification.extra_data?.username || "مستخدم",
      }),
    },

    comment: {
      icon: CommunityIcon,
      title: translate("notifications.comment.title"),
      description: translate("notifications.comment.description", {
        name: notification.extra_data?.username || "مستخدم",
      }),
    },

    reminder: {
      icon: MdNotificationsActive,
      title: translate("notifications.reminder.title", {
        type: notification.extra_data?.type || "Reminder",
      }),
      description: translate("notifications.reminder.description", {
        type: notification.extra_data?.type || "Reminder",
        title: notification.extra_data?.title || "You have a new reminder.",
      }),
    },

    system: {
      icon: IoSettingsOutline,
      title: translate("notifications.system.title"),
      description: translate("notifications.system.description", {
        version: notification.extra_data?.version || "",
      }),
    },

    message: {
      icon: PiChatCircleTextBold,
      title: translate("notifications.message.title"),
      description: translate("notifications.message.description", {
        name: notification.extra_data?.senderName || "مستخدم",
      }),
    },

    friend_request: {
      icon: BsFillPersonPlusFill,
      title: translate("notifications.friend_request.title"),
      description: translate("notifications.friend_request.description", {
        name: notification.extra_data?.username || "مستخدم",
      }),
    },

    accept_request: {
      icon: BsFillPersonCheckFill,
      title: translate("notifications.accept_request.title"),
      description: translate("notifications.accept_request.description", {
        name: notification.extra_data?.username || "مستخدم",
      }),
    },

    glucose: {
      icon: GlucoseIcon,
      title: translate("notifications.glucose.title"),
      description: translate("notifications.glucose.description", {
        level: notification.extra_data?.glucoseLevel || "--",
      }),
    },
  };

  const IconComponent =
    cardContent[notification.type]?.icon || MdNotificationsActive;

  const toastStyle = {
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "16px",
    padding: "16px",
    maxWidth: "400px",
    width: "100%",
    border: isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(217, 217, 217, 0.3)",
    background: isDarkMode
      ? "linear-gradient(to bottom right, #1F1A5F, #161A41)"
      : "#FFFFFF",
    color: isDarkMode ? "#FAFAFF" : "#1F1A5F",
    boxShadow: isDarkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.5)"
      : "0 10px 25px rgba(105, 118, 235, 0.5)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={toastStyle}
      onClick={() => navigate("/notifications")}
      className={`group cursor-pointer ${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } pointer-events-auto flex items-start gap-4 ring-1 ring-black ring-opacity-5`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-[#6976EB]/20 rounded-lg flex items-center justify-center shrink-0">
        <IconComponent className="w-6 h-6 text-[#6976EB]" />
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
        <h3
          className="font-bold text-lg truncate"
          style={{
            color: isDarkMode ? "#FAFAFF" : "#161A41",
          }}
        >
          {cardContent[notification.type]?.title || "إشعار جديد"}
        </h3>

        <p
          className="mt-1 text-sm"
          style={{
            color: isDarkMode ? "rgba(250,250,255,0.75)" : "#6B7280",
          }}
        >
          {cardContent[notification.type]?.description ||
            "لديك إشعار جديد، تحقق منه الآن!"}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={(e) => {toast.dismiss(t.id); e.stopPropagation();}}
        className="flex items-center justify-center text-sm font-bold hover:opacity-80 transition-opacity cursor-pointer"
        style={{
          color: isDarkMode ? "#FAFAFF" : "#6976EB",
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}
