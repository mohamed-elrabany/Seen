import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added
import Button from "../ui/Button";

import { IoPerson } from "react-icons/io5";
import { LuFlame } from "react-icons/lu";
import { GoTrophy } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";

export default function ProfileHeader() {
  const { t } = useTranslation(); // Initialize
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userName = user?.first_name ? `${user.first_name} ${user.last_name}` : "username";

  const categoryColorMap = {
    type1: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 capitalize",
    type2: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 capitalize",
    lada: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase",
    mody: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 uppercase",
    gestational: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 capitalize",
    general: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 capitalize",
    advices: "bg-gray-200 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300 capitalize",
  };

  const profileBorderColorMap = {
    type1: "border-2 border-red-700 dark:border-red-400",
    type2: "border-2 border-blue-700 dark:border-blue-400",
    mody: "border-2 border-orange-700 dark:border-orange-400",
    lada: "border-2 border-green-700 dark:border-green-400",
    gestational: "border-2 border-purple-700 dark:border-purple-400",
  };

  const categoryColor = categoryColorMap[user?.diabetes_type] ?? "bg-gray-100 text-gray-700";
  const profileBorderColor = profileBorderColorMap[user?.diabetes_type] ?? "border-2 border-gray-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl flex flex-col gap-4 p-8 justify-center items-center md:flex-row md:justify-between md:items-center 
             bg-white bg-none border-[#D9D9D9]/30 border shadow-lg
             dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
      <div className="flex flex-col justify-center items-center md:flex-row gap-4">
        {/* profile photo */}
        <div className={`w-32 h-32 flex items-center justify-center rounded-3xl shadow-lg ${profileBorderColor}`}>
          {user?.profileImg ? (
            <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <IoPerson className="w-16 h-16 text-[#6976EB]" />
          )}
        </div>

        {/* user info */}
        <div className="flex-col-center gap-2 mt-4">
          <h2 className="text-center text-[#161A41] dark:text-white">{userName}</h2>
          
          <p className={`px-4 py-2 w-full text-center rounded-full font-bold ${categoryColor}`}>
            {/* Reusing the shared categories from earlier */}
            {t(`communityPage.shared.categories.${user?.diabetes_type || "type2"}`)}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
            <div className="flex-center gap-2">
              <GoTrophy className="w-5 h-5 text-[#FFD700]" />
              <span className="font-bold text-[#3B3D53] dark:text-gray-300">
                {t("profilePage.header.points", { count: 5 })}
              </span>
            </div>
            <div className="flex-center gap-2">
              <LuFlame className="w-5 h-5 text-[#FF9800]" />
              <span className="font-bold text-[#3B3D53] dark:text-gray-300">
                {t("profilePage.header.streak", { count: "1,234" })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center justify-center md:justify-start gap-6 mb-4">
            <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">122</p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.followers")}
              </span>
            </div>
            <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">67</p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.following")}
              </span>
            </div>
            <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">37k</p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.support")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button
          onClick={() => navigate(`/profile/edit/${user?.id || ":userId"}`)}
          className="px-6 py-3 cursor-pointer rounded-xl text-white
            bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
            bg-[length:200%_auto] bg-left transition-all duration-500 ease-out
            hover:bg-right active:scale-[0.98]"
        >
          <FiEdit className="w-5 h-5" />
          <p>{t("profilePage.header.editAccount")}</p>
        </Button>
        
        <Button
          onClick={() => navigate("/settings")}
          className="px-6 py-3 flex justify-start items-center gap-2 cursor-pointer bg-[#F8F9FF] text-[#808080] hover:bg-[#ADB4F3]/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-gray-300 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
        >
          <MdOutlineSettings className="w-5 h-5" />
          <p>{t("profilePage.header.settings")}</p>
        </Button>
      </div>
    </motion.div>
  );
}