import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { themeActions } from "../../store/slices/themeSlice";
import { notificationActions } from "../../store/slices/notificationSlice";
import { motion } from "framer-motion";

import Button from "../ui/Button";

import {
  MdOutlineNotifications,
  MdOutlineNotificationsOff,
  MdOutlineLanguage,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function Prefrences() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { toggleTheme } = themeActions;
  const isEnabled = useSelector((state) => state.notification.isEnabled);
  const { toggleEnabled } = notificationActions;

  const preferenceItems = [
    {
      id: "theme",
      title: t("settings.preferences.theme.title"),
      desc: t("settings.preferences.theme.description"),
      icon: <MdOutlineDarkMode className="h-5 w-5 text-[#6976EB]" />,
      action: () => dispatch(toggleTheme()),
      btnIcon:
        theme === "dark" ? (
          <MdOutlineLightMode className="w-5 h-5" />
        ) : (
          <MdOutlineDarkMode className="w-5 h-5" />
        ),
      btnText:
        theme === "dark"
          ? t("sidebar.buttons.lightMode")
          : t("sidebar.buttons.darkMode"),
    },
    {
      id: "language",
      title: t("settings.preferences.language.title"),
      desc: t("settings.preferences.language.description"),
      icon: <MdOutlineLanguage className="h-5 w-5 text-[#6976EB]" />,
      action: () => i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar"),
      btnIcon: <MdOutlineLanguage className="w-5 h-5" />,
      btnText: i18n.language === "ar" ? "English" : "العربية",
    },
    {
      id: "notifications",
      title: t("settings.preferences.notification.title"),
      desc: t("settings.preferences.notification.description"),
      icon: <MdOutlineNotifications className="h-5 w-5 text-[#6976EB]" />,
      action: () => dispatch(toggleEnabled()),
      btnIcon: isEnabled ? (
        <MdOutlineNotifications className="w-5 h-5" />
      ) : (
        <MdOutlineNotificationsOff className="w-5 h-5" />
      ),
      btnText: isEnabled
        ? t("settings.preferences.notification.disable")
        : t("settings.preferences.notification.enable"),
    },
  ];
  
  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-2xl shadow-lg border
  bg-white bg-none border-[#D9D9D9]/30
  dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
      <div className="p-6 w-full flex items-center justify-start bg-gray-50/50 dark:bg-white/5">
        <h2 className="mb-0">{t("settings.preferences.title")}</h2>
      </div>

      {preferenceItems.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-4 text-start">
            <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 shrink-0 flex-center">
              {item.icon}
            </div>
            <div>
              <h4 className="mb-0 font-bold leading-tight">{item.title}</h4>
              <p className="meta-text mt-1">{item.desc}</p>
            </div>
          </div>

          <Button
            onClick={item.action}
            className="w-full sm:w-auto flex items-center justify-center gap-4 cursor-pointer font-semibold px-4 py-3 sm:py-2 rounded-lg text-xs
        bg-[#6976EB]/10 text-[#6976EB] border border-[#6976EB]/20 hover:bg-[#6976EB] hover:text-white transition-all active:scale-95"
          >
            {item.btnIcon}
            <span>{item.btnText}</span>
          </Button>
        </div>
      ))}
    </motion.div>
  );
}
