import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PostComment({
  id,
  content,
  likesCount,
  isLiked,
  dueDate,
  user,
}) {
  const [like, setLike] = useState(isLiked);

  const profileBorderColorMap = {
    type1: "border-2 border-red-700 dark:border-red-400",
    type2: "border-2 border-blue-700 dark:border-blue-400",
    mody: "border-2 border-orange-700 dark:border-orange-400",
    lada: "border-2 border-green-700 dark:border-green-400",
    gestational: "border-2 border-purple-700 dark:border-purple-400",
  };
  const profileBorderColor =
    profileBorderColorMap[user?.diabetesType] ?? "border-2 border-gray-300";
  return (
    <div className="flex-col-start w-full gap-4 border-b border-[#D9D9D9]/30 p-4">
      <div className="flex-between w-full">
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

        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          animate={like ? { scale: [1.2, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => setLike((prev) => !prev)}
          className="flex-col-center text-[#808080] w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
        >
          {like ? (
            <FaHeart className="w-5 h-5 text-red-600" />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
          <span className={`${like ? "text-red-600" : ""}`}>{likesCount}K</span>
        </motion.button>
      </div>
      <p className="w-full">{content}</p>
    </div>
  );
}
