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
import BlockedUsersModal from "../../components/modals/BlockedUsersModal";
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

import Danger from "../../components/settings/Danger";
import Prefrences from "../../components/settings/Prefrences";
import Account from "../../components/settings/Account";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};



export default function Settings() {
  const { t } = useTranslation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutRef = useRef();
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const deleteAccountRef = useRef();
  const [showBlocksModal, setShowBlocksModal] = useState(false);


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
      <Account openBlocksModal={() => setShowBlocksModal(true)} />

      {/* 2. Preferences Section */}
      <Prefrences />

      {/* 3. Danger Zone Section */}
        <Danger 
          showLogout={setShowLogoutConfirm} 
          showDelete={setShowDeleteAccountConfirm} />

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
      <BlockedUsersModal
        isOpen={showBlocksModal}
        onClose={() => setShowBlocksModal(false)}
       />
    </motion.div>
  );
}
