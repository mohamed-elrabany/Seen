import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import { BsPerson, BsTrash } from "react-icons/bs";
import { GoLock } from "react-icons/go";
import { 
  MdOutlineLogout, 
  MdOutlineNotifications, 
  MdOutlineLanguage, 
  MdOutlineDarkMode 
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
  const user = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="space-y-8"
    >
      <Header className="flex-col-between">
        <div className="w-full flex-col-start gap-4 mb-6">
          <h1 className="text-white">Settings</h1>
          <p className="text-white">
            Customize your experience and manage your account settings here.
          </p>
        </div>
      </Header>

      {/* Account Section */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl shadow-lg border
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
      >
        <div className="p-6 w-full flex items-center justify-start bg-[#161A41]/5 dark:bg-white/5">
          <h2 className="mb-0">Account</h2>
        </div>

        <div
          onClick={() => navigate(`profile/edit/${user?.id}`)}
          className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-[#161A41]/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <BsPerson className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Edit Profile</h4>
            <p className="meta-text">Update your personal information and preferences.</p>
          </div>
        </div>

        <div className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-[#161A41]/5 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <GoLock className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Security and Privacy</h4>
            <p className="meta-text">Manage your security settings and privacy preferences.</p>
          </div>
        </div>

        <div className="p-4 border-t border-[#D9D9D9]/30 space-y-4">
          <Button
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
            text-[#FF0404] border border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-all"
            onClick={() => console.log("Logout")}
          >
            <MdOutlineLogout className="w-5 h-5" />
            <div className="text-left">
              <h4 className="mb-0 font-bold text-[#FF0404]">Logout Account</h4>
              <p className="text-sm opacity-80">Sign out of your current session.</p>
            </div>
          </Button>

          <Button
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
            text-[#FF0404] border border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-all"
            onClick={() => console.log("Delete")}
          >
            <BsTrash className="w-5 h-5" />
            <div className="text-left">
              <h4 className="mb-0 font-bold text-[#FF0404]">Delete Account</h4>
              <p className="text-sm opacity-80">Permanently remove your account and data.</p>
            </div>
          </Button>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl shadow-lg border
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
      >
        <div className="p-6 w-full flex items-center justify-start bg-[#161A41]/5 dark:bg-white/5">
          <h2 className="mb-0">Preferences</h2>
        </div>

        {/* Theme Settings */}
        <div className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-[#161A41]/5 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <MdOutlineDarkMode className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Display Theme</h4>
            <p className="meta-text">Switch between light and dark mode appearance.</p>
          </div>
        </div>

        {/* Language Settings */}
        <div className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-[#161A41]/5 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <MdOutlineLanguage className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Language</h4>
            <p className="meta-text">Choose your preferred language for the interface.</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-[#161A41]/5 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <MdOutlineNotifications className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Notifications</h4>
            <p className="meta-text">Configure how you receive alerts and updates.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}