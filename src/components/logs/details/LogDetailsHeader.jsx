//Assets & UI
import Button from "../../ui/Button";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function LogDetailsHeader({ logHeaderData, logId }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const title = logHeaderData?.log_title || "Untitled Log";
  const description = logHeaderData?.log_description || "No description provided for this log.";
  const time = logHeaderData?.logged_at
  ? new Date(logHeaderData.logged_at).toLocaleString(i18n.language, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      numberingSystem: 'latn' // Ensures numbers are 1, 2, 3 even in Arabic/Hindi locales
    })
  : "Time not recorded";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl flex flex-col gap-8 p-8 justify-center items-center md:flex-row md:justify-between md:items-center 
             bg-white bg-none border-[#D9D9D9]/30 border shadow-lg
             dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
      {/* Log Text Content */}
      <div className="flex-1 space-y-2 text-center md:text-start">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6976EB] dark:text-[#8b96f5]">
            {time}
          </p>
          <h2 className="text-3xl font-bold text-[#161A41] dark:text-white mb-0">
            {title}
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto">
        <Button
          onClick={() => navigate(`/logs/edit/${logId}`)}
          className="cursor-pointer rounded-xl text-white
            flex items-center justify-center gap-4 p-4 min-w-[160px]
            bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
            bg-[length:200%_auto] bg-left transition-all duration-500 ease-out
            hover:bg-right active:scale-[0.98]"
        >
          <FiEdit className="w-5 h-5" />
          <p className="font-bold">Edit Log</p>
        </Button>
        
        <Button
          className="w-full flex items-center justify-center gap-4 p-4 rounded-xl cursor-pointer
            text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 transition-colors"
        >
          <RiDeleteBin6Line className="w-5 h-5" />
          <p className="font-bold">Delete Log</p>
        </Button>
      </div>
    </motion.div>
  );
}