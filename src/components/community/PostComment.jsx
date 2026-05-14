import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

import {formatCount} from "../../util/formatPostStatus";
import { formatRelativeTime } from "../../util/formatRelativeTime";
import { useTranslation } from "react-i18next";

export default function PostComment({ comment, onLike }) {
  const { t } = useTranslation();
  
  // Use the correct keys from your console log
  const formattedLikesCount = formatCount(comment.likes_count, t);
  const relativeDate = formatRelativeTime(comment.created_at);

  const profileBorderColorMap = {
    type1: "border-2 border-red-700 dark:border-red-400",
    type2: "border-2 border-blue-700 dark:border-blue-400",
    mody: "border-2 border-orange-700 dark:border-orange-400",
    lada: "border-2 border-green-700 dark:border-green-400",
    gestational: "border-2 border-purple-700 dark:border-purple-400",
  };

  const profileBorderColor =
    profileBorderColorMap[comment.user?.diabetes_type] ?? "border-2 border-gray-300";
    console.log("User name:", comment.user?.first_name, comment.user?.last_name);

  return (
    <div className="flex-col-start w-full gap-4 last:border-b-0 border-b border-[#D9D9D9]/20 p-4">
      <div className="flex-between w-full">
        <div className="flex-start gap-4">
          <div className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}>
            {/* Note: In your log it's profile_picture, not avatar. Check this: */}
            <img src={comment.user?.profile_picture || comment.user?.avatar} alt="" />
          </div>
          <div className="flex-col-start">
            <p className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold">
              {comment.user?.first_name} {comment.user?.last_name}
            </p>
            <p className="text-[#808080] dark:text-white/30 text-xs sm:text-sm">{relativeDate}</p>
          </div>
        </div>

        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          // Animate based on the prop, not local state
          animate={comment.is_liked ? { scale: [1.2, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={onLike}
          className="flex-col-center text-[#808080] dark:text-gray-400 w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
        >
          {comment.is_liked ? (
            <FaHeart className="w-5 h-5 text-red-600" />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
          <span className={`${comment.is_liked ? "text-red-600" : ""}`}>
            {formattedLikesCount}
          </span>
        </motion.button>
      </div>
      <p className="w-full text-[#808080] dark:text-gray-400">{comment.comment_text}</p>
    </div>
  );
}
