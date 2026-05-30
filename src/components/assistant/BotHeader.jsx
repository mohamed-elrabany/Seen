import { IoChevronBack } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri"; // Importing a premium bot icon
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BotChatHeader() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 p-4 mt-30 lg:mt-0 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#161A41] w-full">
      

      {/* 2. Bot Assistant Avatar Icon */}
      <div
        className="w-12 h-12 border-2 border-[#6976EB] bg-[#6976EB]/10 rounded-full flex items-center justify-center shrink-0 text-[#6976EB]"
      >
        <RiRobot2Line className="w-6 h-6" />
      </div>

      {/* 3. Assistant Name Container */}
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[#161A41] dark:text-white mb-0 text-lg truncate">
          المساعد الذكي
        </h3>
        <p className="text-xs text-[#6976EB] font-medium m-0">
          نشط الآن
        </p>
      </div>
    </div>
  );
}