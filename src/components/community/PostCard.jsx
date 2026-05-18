import { FaRegComment } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { formatRelativeTime } from "../../util/formatRelativeTime";
import { formatCount } from "../../util/formatPostStatus";

import PostImages from "./PostImages";
import DeletePostModal from "../modals/DeletePostModal";
import LikesModal from "../modals/LikesModal";
import EditPostModal from "../modals/EditPostModal";
import { useToggleLike } from "../../hooks/mutations/useTogglePostLike";

export default function PostCard({ post }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const relativeDate = formatRelativeTime(post.created_at);
  const formattedLikesCount = formatCount(post.likes_count, t);
  const formattedCommentsCount = formatCount(post.comments_count, t);
  
  const togglePostLike = useToggleLike();
  function handleLike() {
    togglePostLike.mutate(post.id);
  }

  const categoryColorMap = {
    "type1 / lada":
      "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444] capitalize",
    type2: "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6] capitalize",
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
    categoryColorMap[post.category.toLowerCase()] ??
    "bg-gray-100 text-gray-700";
  const profileBorderColor =
    profileBorderColorMap[post.user?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";

  return (
    <div
      className="w-full shadow-lg flex-col-start gap-8 border p-4 md:p-6 rounded-2xl
    bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
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
            <p className="text-[#808080] dark:text-gray-400 text-xs sm:text-sm">
              {relativeDate}
            </p>
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
        <p className="text-[#3B3D53] dark:text-gray-300 text-sm sm:text-base">
          {post.content}
        </p>
      </div>

      {/* images section */}
      <PostImages images={post?.images} />

      {/* post status section */}
      <div
        className={`w-full ${post.isOwner ? "flex-between" : "flex-start"} pt-3 border-t border-[#D9D9D9]/50`}
      >
        <div className="flex-start w-full gap-4 ">
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            animate={post.is_liked ? { scale: [1.2, 1] } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-center text-[#808080] dark:text-gray-400 w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
          >
            {post.is_liked ? (
              <FaHeart
                onClick={handleLike}
                className="w-5 h-5 text-[#FB2C36]"
              />
            ) : (
              <FaRegHeart onClick={handleLike} className="w-5 h-5" />
            )}
            <span
              onClick={() => setIsLikesModalOpen(true)}
              className={`w-5 ${post.is_liked ? "text-[#FB2C36]" : ""}`}
            >
              {formattedLikesCount}
            </span>
          </motion.button>
          <button
            onClick={() =>
              navigate(`/community/posts/${post.id}`, {
                replace: true,
                state: { post, from: location.pathname + location.search }, // Tracks exactly where you clicked it
              })
            }
            className="flex-center w-auto gap-2 text-[#808080] dark:text-gray-400 hover:text-[#6976EB] transition-colors cursor-pointer"
          >
            <FaRegComment className="w-5 h-5" />
            <span>{formattedCommentsCount}</span>
          </button>
        </div>

        {post.user.id === user?.id && (
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="cursor-pointer p-2 text-center rounded-md hover:bg-gray-300 dark:hover:bg-gray-900/30"
            >
              <FiEdit className="text-gray-700 dark:text-gray-300 w-5 h-5" />
            </button>
            <button
              className="cursor-pointer p-2 text-center rounded-md hover:bg-red-100 dark:hover:bg-[#FB2C36]/20"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <RiDeleteBin6Line className="text-[#FB2C36] w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <EditPostModal
        postData={post}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeletePostModal
        postId={post.id}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <LikesModal
        isOpen={isLikesModalOpen}
        onClose={() => setIsLikesModalOpen(false)}
        id={post.id}
        type="post"
      />
    </div>
  );
}
