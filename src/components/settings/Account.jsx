import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BsPerson } from "react-icons/bs";
import { GoLock } from "react-icons/go";
import { BsPersonFillSlash } from "react-icons/bs";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function Account({ openBlocksModal }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
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
          onClick={() => navigate('/user/data/show', { replace: true })}
          className="w-full cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
        >
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <BsPerson className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Personal Information</h4>
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

        <div 
        onClick={openBlocksModal}
        className="w-full group cursor-pointer flex items-center justify-start gap-4 p-6 border-t border-[#D9D9D9]/30 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
          <div className="bg-[#6976EB]/10 border-[#6976EB] rounded-lg p-2 flex-center">
            <BsPersonFillSlash className="h-5 w-5 text-[#6976EB]" />
          </div>
          <div>
            <h4 className="mb-0 font-bold">Blocked Users</h4>
            <p className="meta-text">
              Here you can view and manage the users you've blocked. Unblocking a user will allow them to interact with you again.
            </p>
          </div>
        </div>
      </motion.div>
  );
}