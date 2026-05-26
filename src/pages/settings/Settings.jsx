import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { themeActions } from "../../store/slices/themeSlice";
import { notificationActions } from "../../store/slices/notificationSlice";

import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import LogoutModal from "../../components/modals/LogoutModal";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal";
import { BsPerson, BsTrash } from "react-icons/bs";
import { GoLock } from "react-icons/go";

import {
  MdOutlineLogout,
  MdOutlineNotifications,
  MdOutlineNotificationsOff,
  MdOutlineLanguage,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function Settings() {
  const { isEnabled } = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user.user);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const { toggleTheme } = themeActions;
  const { toggleEnabled } = notificationActions;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutRef = useRef();
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const deleteAccountRef = useRef();

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
      btnText: isEnabled ? t("settings.preferences.notification.disable") : t("settings.preferences.notification.enable"),
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8"
    >
      <Header className="flex-col-between">
        <div className="w-full flex-col-start gap-4 mb-6">
          <h1 className="text-white">{t("settings.title")}</h1>
          <p className="text-white">
            {t("settings.description")}
          </p>
        </div>
      </Header>

      {/* 1. Account Section */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl shadow-lg border
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
      >
        <div className="p-6 w-full flex items-center justify-start bg-gray-50/50 dark:bg-white/5">
          <h2 className="mb-0">{t("settings.account.title")}</h2>
        </div>

        <div
          onClick={() => navigate(`profile/edit/${user?.id}`)}
          className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
        >
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <BsPerson className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">{t("settings.account.edit.title")}</h4>
            <p className="meta-text">
              {t("settings.account.edit.description")}
            </p>
          </div>
        </div>

        <div className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <GoLock className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">{t("settings.account.security.title")}</h4>
            <p className="meta-text">
              {t("settings.account.security.description")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Preferences Section */}
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

      {/* 3. Danger Zone Section */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl shadow-lg border
        bg-white bg-none border-[#FF0404]/20
        dark:bg-gradient-to-br dark:from-[#2a1a1a] dark:to-[#161A41] dark:border-[#FF0404]/20"
      >
        <div className="p-6 w-full flex items-center justify-start bg-[#FF0404]/5">
          <h2 className="mb-0 text-[#FF0404]">{t("settings.danger.title")}</h2>
        </div>

        <div className="p-6 border-t border-[#FF0404]/20 space-y-4">
          <Button
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
            text-[#FF0404] border border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-all"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <MdOutlineLogout className="w-5 h-5" />
            <div className="text-start">
              <h4 className="mb-0 font-bold text-[#FF0404]">{t("settings.danger.logout.title")}</h4>
              <p className="text-sm opacity-80">
                {t("settings.danger.logout.description")}
              </p>
            </div>
          </Button>

          <Button
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
            text-[#FF0404] border border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-all"
            onClick={() => setShowDeleteAccountConfirm(true)}
          >
            <BsTrash className="w-5 h-5" />
            <div className="text-start">
              <h4 className="mb-0 font-bold text-[#FF0404]">{t("settings.danger.delete.title")}</h4>
              <p className="text-sm opacity-80">
                {t("settings.danger.delete.description")}
              </p>
            </div>
          </Button>
        </div>
      </motion.div>

      <LogoutModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        logoutRef={logoutRef}
      />
      <DeleteAccountModal
        isOpen={showDeleteAccountConfirm}
        onClose={() => setShowDeleteAccountConfirm(false)}
        deleteRef={deleteAccountRef}
      />
    </motion.div>
  );
}
