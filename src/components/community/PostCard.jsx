import { FaRegComment } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatRelativeTime } from "../../util/formatRelativeTime";
import {formatCount} from "../../util/formatPostStatus";

import PostImages from "./PostImages";

export default function PostCard({ post,...props
}) {
  const [like, setLike] = useState(post.isLiked);
  const navigate= useNavigate();
  const { t } = useTranslation();

  const relativeDate = formatRelativeTime(post.created_at);
  const formattedLikesCount = formatCount(post.likes_count, t);
  const formattedCommentsCount = formatCount(post.comments_count, t);


const categoryColorMap = {
  type1: "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444] capitalize",
  type2: "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6] capitalize",
  lada: "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e] uppercase",
  mody: "bg-[#f97316]/20 text-[#f97316] border-[#f97316] uppercase",
  gestational: "bg-[#a855f7]/20 text-[#a855f7] border-[#a855f7] capitalize",
  general: "bg-[#eab308]/20 text-[#eab308] border-[#eab308] capitalize",
  advices: "bg-[#9ca3af]/20 text-[#9ca3af] border-[#9ca3af] capitalize",
};

const profileBorderColorMap = {
  type1: "border-2 border-[#ef4444]",
  type2: "border-2 border-[#3b82f6]",
  mody: "border-2 border-[#f97316]",
  lada: "border-2 border-[#22c55e]",
  gestational: "border-2 border-[#a855f7]",
};

  const categoryColor =
    categoryColorMap[post.category.toLowerCase()] ?? "bg-gray-100 text-gray-700";
  const profileBorderColor =
    profileBorderColorMap[post.user?.diabetes_type] ?? "border-2 border-gray-300";

  return (
    <div className="w-full shadow-lg flex-col-start gap-8 border p-4 md:p-6 rounded-2xl
    bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10">
      {/* user info */}
      <div className="flex justify-between items-center w-full">
        <div className="flex-start gap-4">
          <div
            className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
          >
            <img src={post.user?.profile_picture} alt="profile_picture" />
          </div>
          <div className="flex-col-start">
            <p className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold">
              {post.user?.full_name}
            </p>
            <p className="text-[#808080] dark:text-gray-400 text-xs sm:text-sm">{relativeDate}</p>
          </div>
        </div>
        <p
          className={`px-4 py-2 text-center text-xs md:text-base rounded-full font-bold ${categoryColor}`}
        >
          {t(`communityPage.shared.categories.${post.category.toLowerCase()}`)}
        </p>
      </div>

      {/* content section */}
      <div>
        <h3 className="text-[#161A41] dark:text-white">{post.title}</h3>
        <p className="text-[#3B3D53] dark:text-gray-300 text-sm sm:text-base">{post.content}</p>
      </div>

      {/* images section */}
      <PostImages images={post?.images} />

      {/* post status section */}
      <div
        className={`w-full ${post.isOwner ? "flex-between" : "flex-start"} pt-3 border-t border-[#D9D9D9]/50`}
      >
        <div className="flex-start w-full gap-4 ">
          <motion.button
          initial={{scale: 1}}
          whileTap={{ scale: 0.9 }}
          animate={like ? { scale: [1.2, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setLike(prev => !prev)}
            className="flex-center text-[#808080] dark:text-gray-400 w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
          >
            {like ? (
              <FaHeart className="w-5 h-5 text-red-600" />
            ) : (
              <FaRegHeart className="w-5 h-5" />
            )}
            <span className={`${like ? "text-red-600" : ""}`}>{formattedLikesCount}</span>
          </motion.button>
          <button onClick={()=> navigate(`/community/${post.id}`, { state: { post } })}
          className="flex-center w-auto gap-2 text-[#808080] dark:text-gray-400 hover:text-[#6976EB] transition-colors cursor-pointer">
            <FaRegComment className="w-5 h-5" />
            <span>{formattedCommentsCount}</span>
          </button>
        </div>

        {post.isOwner && (
          <div className="flex gap-2 justify-center items-center">
            <button className="cursor-pointer p-2 text-center rounded-md hover:bg-gray-300 dark:hover:bg-gray-900/30">
              <FiEdit className="text-gray-700 dark:text-gray-300 w-5 h-5" />
            </button>
            <button className="cursor-pointer p-2 text-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30">
              <RiDeleteBin6Line className="text-red-600 w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
