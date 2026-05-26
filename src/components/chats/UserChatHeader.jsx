import { IoChevronBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function UserChatHeader({ user, onBackClick }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const profileBorderColorMap = {
    type1: "border-2 border-[#ef4444]",
    type2: "border-2 border-[#3b82f6]",
    mody: "border-2 border-[#f97316]",
    lada: "border-2 border-[#22c55e]",
    gestational: "border-2 border-[#a855f7]",
  };

  const profileBorderColor =
    profileBorderColorMap[user?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#161A41] w-full">
      
      {/* 1. Back Navigation Button: 
         - `rtl:rotate-180` flips the left arrow to face right when the document dir="rtl"
      */}
      <button 
        onClick={() => navigate(-1)}
        className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors duration-200 text-[#161A41] dark:text-white"
        aria-label="Back"
      >
        <IoChevronBack className="text-2xl transform rtl:rotate-180" />
      </button>

      {/* 2. User Profile Picture */}
      <div
        className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
      >
        <img 
          src={user?.profile_picture || "https://i.pravatar.cc/150?img=7"} 
          alt="profile_picture" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. User Name Container */}
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[#161A41] dark:text-white mb-0 text-lg truncate">
          {user?.name || "منتصر إسماعيل"}
        </h3>
      </div>
    </div>
  );
}