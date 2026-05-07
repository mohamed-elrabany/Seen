//icons
import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import GlucoseIcon from "./GlucoseIcon";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LogCard({ logData }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  // const navigate = useNavigate();

  const displayedTime = logData.log_time
    ? new Date(logData.log_time).toLocaleTimeString(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        numberingSystem: 'latn'
      })
    : "No time";

  const getGlucoseStatus = (value) => {
    if (value === null || value === undefined || value === "") return "empty";
    const num = Number(value);
    if (num < 70) return "low";
    if (num <= 140) return "normal";
    return "high";
  };

  const glucoseReadingTag = {
    low: "text-[#FF9800] bg-[#FF9800]/20",
    normal: "text-[#17CE92] bg-[#17CE92]/20",
    high: "text-[#FB2C36] bg-[#FB2C36]/20",
    empty:
      "text-[#808080] dark:text-gray-400 bg-[#808080]/20 dark:bg-gray-400/20",
  };

  const glucoseReading = logData?.recordGlucose?.glucose_level;
  const glucoseStatus = getGlucoseStatus(glucoseReading);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="w-full group cursor-pointer space-y-2 bg-white dark:bg-white/5 rounded-2xl p-4 border border-[#D9D9D9]/30 dark:border-white/10"
      style={{
        boxShadow: `
            ${!isRTL ? "inset 4px 0px 0px 0px #6976EB" : "inset -4px 0px 0px 0px #6976EB"} ,
            0 2px 4px -1px rgba(0, 0, 0, 0.1)
            `,
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold">{logData.log_title}</h4>
        <span className="text-sm text-[#808080] dark:text-gray-400">
          {displayedTime}{" "}
        </span>
      </div>

      <p className="text-sm text-[#808080] dark:text-gray-400 leading-relaxed">
        {logData.log_description}
      </p>

      <div className="flex items-center justify-between">
        {/* Icons with white rings to create the overlap effect from Frame 34648.png */}
        <div className="flex items-center -space-x-2">
          {logData.recordGlucose && (
            <div className="bg-[#6976EB] p-2 rounded-full text-white ring-1 ring-white/5">
              <GlucoseIcon className="w-4 h-4" />
            </div>
          )}
          {logData.medication && (
            <div className="bg-[#6976EB] p-2 rounded-full text-white ring-1 ring-white/5">
              <BiSolidInjection className="w-4 h-4" />
            </div>
          )}
          {logData.recordMeal && (
            <div className="bg-[#6976EB] p-2 rounded-full text-white ring-1 ring-white/5">
              <BsForkKnife className="w-4 h-4" />
            </div>
          )}
        </div>
        <span
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${glucoseReadingTag[glucoseStatus]}`}
        >
          {glucoseReading ? `${glucoseReading} mg/dL` : "No glucose reading"}
        </span>
      </div>
    </motion.div>
  );
}
