import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Button from "../ui/Button";

import { BsTrash } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function Danger({ showLogout, showDelete }) {
    const { t } = useTranslation();
  return (
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
          onClick={() => showLogout(true)}
        >
          <MdOutlineLogout className="w-5 h-5" />
          <div className="text-start">
            <h4 className="mb-0 font-bold text-[#FF0404]">
              {t("settings.danger.logout.title")}
            </h4>
            <p className="text-sm opacity-80">
              {t("settings.danger.logout.description")}
            </p>
          </div>
        </Button>

        <Button
          className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
                text-[#FF0404] border border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-all"
          onClick={() => showDelete(true)}
        >
          <BsTrash className="w-5 h-5" />
          <div className="text-start">
            <h4 className="mb-0 font-bold text-[#FF0404]">
              {t("settings.danger.delete.title")}
            </h4>
            <p className="text-sm opacity-80">
              {t("settings.danger.delete.description")}
            </p>
          </div>
        </Button>
      </div>
    </motion.div>
  );
}
