import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { LuRuler } from "react-icons/lu";
import { TiFlashOutline } from "react-icons/ti";
import { LuDroplet } from "react-icons/lu";
import { FaWeightScale } from "react-icons/fa6";

export default function PersonalInfo() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const userName = (user?.first_name + " " + user?.last_name) ?? "username";

  // Helper to format the date using JSON month keys
  const formatBirthDate = (dateString) => {
    if (!dateString) {
      return `15 ${t("profilePage.personalInfo.months.2")} 1990`;
    }
    const date = new Date(dateString);
    return `${date.getDate()} ${t(`profilePage.personalInfo.months.${date.getMonth()}`)} ${date.getFullYear()}`;
  };

  const calculateAge = (birthDateString) => {
  if (!birthDateString) return 0;
  
  const today = new Date();
  const birthDate = new Date(birthDateString);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If we haven't reached the birth month, or we are in the birth month 
  // but haven't reached the birth day, subtract one year.
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <h2 className="text-[#161A41] dark:text-white">
        {t("profilePage.personalInfo.title")}
      </h2>
      <div className="rounded-2xl shadow-lg p-6 border
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <IoPersonOutline className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.fullName")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {userName}
            </p>
          </div>

          {/* Birth Date */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <MdOutlineDateRange className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.birthDateLabel")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {formatBirthDate(user?.birthDate)}
            </p>
            <p className="text-sm text-[#808080] dark:text-gray-400">
              {t("profilePage.personalInfo.ageValue", { count: calculateAge(user?.birthDate) || 34 })}
            </p>
          </div>

          {/* Weight */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <FaWeightScale className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.weightLabel")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {t("profilePage.personalInfo.weightValue", { value: user?.weight || 75 })}
            </p>
          </div>

          {/* Height */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <LuRuler className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.heightLabel")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {t("profilePage.personalInfo.heightValue", { value: user?.height || 175 })}
            </p>
          </div>

          {/* Blood Sugar Unit */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <LuDroplet className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.bloodSugarUnitLabel")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {user?.bloodSugarUnit ?? 'mg/dl'}
            </p>
          </div>

          {/* Carb Unit */}
          <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
            <div className="flex-start gap-2">
              <TiFlashOutline className="w-5 h-5 text-[#6976EB]" />
              <span className="text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.personalInfo.carbUnitLabel")}
              </span>
            </div>
            <p className="text-lg font-bold dark:text-white text-[#161A41]">
              {user?.carbUnit ?? t("profilePage.personalInfo.carbValue")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}