import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Added
import Button from "../ui/Button";
import { useState, useEffect } from "react";

import { sendRequest, acceptRequest } from "../../services/communityServices";
import {
  profileTagStyling,
  getBorderColor,
} from "../../util/community/ctaegoryColors";

import { IoPerson } from "react-icons/io5";
import { LuFlame } from "react-icons/lu";
import { GoTrophy } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import {
  BsFillPersonCheckFill,
  BsFillPersonXFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { MdOutlineBlock } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";

export default function ProfileHeader({ userId, isOwnProfile, openModal }) {
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
 
  async function handleSendRequest() {
    try {
      const result = await sendRequest(userId);
      console.log("Friend request sent successfully:", result);
      toast.success("Friend request sent successfully!"); // Show success message
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Error sending friend request. Please try again."); // Show error message
      // Optionally, show an error message to the user
    }
  }

  async function handleAcceptRequest() {
    try {
      const result = await acceptRequest(userId);
      console.log("Friend request accepted successfully:", result);
      toast.success("Friend request accepted successfully!"); // Show success message
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Error accepting friend request. Please try again."); // Show error message
      // Optionally, show an error message to the user
    }
  }

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
          <h2 className="text-center text-[#161A41] dark:text-white">
            {userName}
          </h2>

          <p
            className={`px-4 py-2 w-full text-center rounded-full font-bold ${categoryColor}`}
          >
            {/* Reusing the shared categories from earlier */}
            {t(`communityPage.shared.categories.${diabetesType}`)}
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

          <div className="grid grid-cols-2 items-center justify-center md:justify-start gap-6 mb-4">
            <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">
                122
              </p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.followers")}
              </span>
            </div>
            <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">
                67
              </p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.following")}
              </span>
            </div>
            {/* <div className="flex-col-center">
              <p className="font-bold text-2xl text-[#161A41] dark:text-white">
                37k
              </p>
              <span className="font-bold text-sm text-[#808080] dark:text-gray-400">
                {t("profilePage.header.support")}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* buttons */}
      {isOwnProfile ? (
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
            className="px-6 py-3 flex justify-start items-center gap-2 cursor-pointer bg-[#808080]/10 text-[#808080] hover:bg-[#808080]/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-gray-400 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
          >
            <MdOutlineSettings className="w-5 h-5" />
            <p>{t("profilePage.header.settings")}</p>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {userName && (
              <Button
              onClick={handleSendRequest}
              className="px-6 py-3 cursor-pointer rounded-xl text-white
              bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
              bg-[length:200%_auto] bg-left transition-all duration-500 ease-out
              hover:bg-right active:scale-[0.98]"
            >
              <BsFillPersonPlusFill className="w-5 h-5" />
              <p>Add Friend</p>
            </Button>
          )}
          

          {userName && (
            <div className="flex justify-center items-center gap-2 w-full">
              <Button
                onClick={handleAcceptRequest}
                className="px-6 py-3 w-full cursor-pointer rounded-xl text-white
              bg-gradient-to-r from-[#6976EB] via-[#4A55C3] to-[#2B3695]
              bg-[length:200%_auto] bg-left transition-all duration-500 ease-out
            hover:bg-right active:scale-[0.98]"
            >
              <BsFillPersonCheckFill className="w-5 h-5" />
              <p>Accept</p>
            </Button>

            <Button
              onClick={openModal}
              className="px-6 py-3 w-full flex justify-start items-center gap-2 cursor-pointer text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
            >
              <BsFillPersonXFill className="w-5 h-5" />
              <p>Reject</p>
            </Button>
          </div>)}

          <Button
            onClick={openModal}
            className="px-6 py-3 flex justify-start items-center gap-2 cursor-pointer text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 rounded-xl active:scale-[0.98] transition-all duration-500 ease-out"
          >
            <MdOutlineBlock className="w-5 h-5" />
            <p>Block</p>
          </Button>
        </div>
      )}
    </motion.div>
  );
}
