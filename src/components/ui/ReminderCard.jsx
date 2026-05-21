//icons
import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import GlucoseIcon from "./GlucoseIcon";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "./Button";
import { formatDisplayedTime } from "../../util/formatDiplayedDate";

export default function ReminderCard({ reminderData, onDelete }) {
    const {t, i18n} = useTranslation();


  const displayedIcon = () => {
    // Keeping your logic: result is an element
    switch (reminderData.message_type) {
      case "glucose_check":
        return <GlucoseIcon className="w-6 h-6" />;
      case "medication":
        return <BiSolidInjection className="w-6 h-6" />;
      case "meal":
        return <BsForkKnife className="w-6 h-6" />;
      default:
        return null;
    }
  };
  const Icon = displayedIcon();
            

  const scheduleTime = reminderData?.time
    ? formatDisplayedTime(reminderData.time)
    : "";

  return (
    <div className="grid grid-cols-5 gap-4 items-stretch w-full p-1">
      {/* Reminder Info */}
      <div className="col-span-4 flex flex-col justify-start items-start gap-2 bg-white dark:bg-[#6976EB]/20 border border-[#D9D9D9]/30 dark:border-white/10 rounded-2xl p-4 shadow-md transition-all">
        <div className="bg-[#6976EB] p-2 rounded-xl text-white flex items-center justify-center">
          {Icon}
        </div>
        <div className="w-full space-x-2">
          <h4 className="font-bold">{reminderData.title}</h4>
          {reminderData.medication_name && (
            <p className="text-[#6976EB] text-sm mb-2">{reminderData.medication_name}</p>
          )}
          <p className="meta-text text-sm">Scheduled for: {scheduleTime}</p>
        </div>
      </div>

      {/* Delete Button */}
      <motion.button 
      onClick={onDelete}
      whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease:'linear' }}
      className="group cursor-pointer col-span-1 w-full bg-white dark:bg-[#6976EB]/20 border border-[#D9D9D9]/30 dark:border-white/10 text-red-500 rounded-2xl flex items-center justify-center shadow-md">
        <RiDeleteBin6Line className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
