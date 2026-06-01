import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added
import Button from "../../ui/Button";
import { useState, useEffect } from "react";

import {
  profileTagStyling,
  getBorderColor,
} from "../../../util/community/ctaegoryColors";

import { IoPerson } from "react-icons/io5";
import { LuFlame } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import {
  BsFillPersonCheckFill,
  BsFillPersonXFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { MdOutlineBlock } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";

export default function ProfileHeader() {
  const { t } = useTranslation(); // Initialize
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  // Debugging log
  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : "username";
  const diabetesType = user?.diabetes_type.toLowerCase() || "gestational";

  const categoryColor = profileTagStyling(diabetesType);
  const profileBorderColor = getBorderColor(diabetesType);
 

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
        <div
          className={`w-32 h-32 flex items-center justify-center rounded-3xl shadow-lg border-2 ${profileBorderColor}`}
        >
          {user?.profileImg ? (
            <img
              src={user.profileImg}
              alt="Profile"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <IoPerson className="w-16 h-16 text-gray-400" />
          )}
        </div>

        {/* user info */}
        <div className="flex-col-center gap-2 mt-4">
          <h2 className="text-center text-[#161A41] dark:text-white mb-0">
            {userName}
          </h2>
          <p className="text-[#6976EB]">
            {user?.email}
          </p>

          <p
            className={`px-4 py-2 w-full text-center rounded-full font-bold ${categoryColor}`}
          >
            {/* Reusing the shared categories from earlier */}
            {t(`communityPage.shared.categories.${diabetesType}`)}
          </p>

          </div>

        </div>

      {/* buttons */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Button
            onClick={() => navigate("/user/data/edit", { replace: true })}
            className="px-6 py-3 cursor-pointer rounded-xl text-white
            bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
            bg-[length:200%_auto] bg-left transition-all duration-500 ease-out
            hover:bg-right active:scale-[0.98]"
          >
            <FiEdit className="w-5 h-5" />
            <p>{t("profilePage.header.editAccount")}</p>
          </Button>
        </div>
      
    </motion.div>
  );
}
