import { FaRegComment } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import PostImages from "./PostImages";

export default function PostCard({
  id,
  title,
  body,
  images,
  category,
  isOwner,
  likesCount,
  isLiked,
  commentsCount,
  hashtags,
  dueDate,
  user,
  ...props
}) {
  const [like, setLike] = useState(isLiked);
  const navigate= useNavigate();

  const categoryColorMap = {
    type1:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 capitalize",
    type2:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 capitalize",
    lada: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase",
    mody: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 uppercase",
    gestational:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 capitalize",
    general:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 capitalize",
    advices:
      "bg-gray-200 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300 capitalize",
  };

  const profileBorderColorMap = {
    type1: "border-2 border-red-700 dark:border-red-400",
    type2: "border-2 border-blue-700 dark:border-blue-400",
    mody: "border-2 border-orange-700 dark:border-orange-400",
    lada: "border-2 border-green-700 dark:border-green-400",
    gestational: "border-2 border-purple-700 dark:border-purple-400",
  };

  const categoryColor =
    categoryColorMap[category] ?? "bg-gray-100 text-gray-700";
  const profileBorderColor =
    profileBorderColorMap[user?.diabetesType] ?? "border-2 border-gray-300";

  return (
    <div className="w-full bg-white shadow-lg flex-col-start gap-8 border border-[#D9D9D9]/30 p-8 rounded-2xl">
      {/* user info */}
      <div className="flex justify-between items-center w-full">
        <div className="flex-start gap-4">
          <div
            className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
          >
            <img src={user?.avatar} alt="" />
          </div>
          <div className="flex-col-start">
            <p className="text-[#161A41] text-sm sm:text-base font-bold">
              {user?.name}
            </p>
            <p className="text-[#808080] text-xs sm:text-sm">{dueDate}</p>
          </div>
        </div>
        <p
          className={`px-4 py-2 text-center rounded-full font-bold ${categoryColor}`}
        >
          {category}
        </p>
      </div>

      {/* content section */}
      <div>
        <h3>{title}</h3>
        <p className="text-[#3B3D53] text-sm sm:text-base">{body}</p>
      </div>

      {/* images section */}
      <PostImages images={images} />

      {/* hastags section */}
      <div className="flex flex-wrap gap-2 pt-2">
        {hashtags?.map((tag, index) => (
          <span
            key={index}
            className="text-sm font-medium text-[#6976EB] bg-[#E0E3FF] px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* post status section */}
      <div
        className={`w-full ${isOwner ? "flex-between" : "flex-start"} pt-3 border-t border-[#D9D9D9]/50`}
      >
        <div className="flex-start w-full gap-4 ">
          <motion.button
          initial={{scale: 1}}
          whileTap={{ scale: 0.9 }}
          animate={like ? { scale: [1.2, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setLike(prev => !prev)}
            className="flex-center text-[#808080] w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
          >
            {like ? (
              <FaHeart className="w-5 h-5 text-red-600" />
            ) : (
              <FaRegHeart className="w-5 h-5" />
            )}
            <span className={`${like ? "text-red-600" : ""}`}>{likesCount}K</span>
          </motion.button>
          <button onClick={()=> navigate(`/community/:${id}`)}
          className="flex-center w-auto gap-2 text-[#808080] hover:text-[#6976EB] transition-colors cursor-pointer">
            <FaRegComment className="w-5 h-5" />
            <span>{commentsCount}K</span>
          </button>
        </div>

        {isOwner && (
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
