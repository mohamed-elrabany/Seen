import { FaRegComment } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { formatRelativeTime } from "../../util/formatRelativeTime";
import { formatCount } from "../../util/formatPostStatus";
import { postTagStyling, getBorderColor } from "../../util/community/ctaegoryColors";

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
  const location = useLocation();
  const { t } = useTranslation();

  const relativeDate = formatRelativeTime(post.created_at);
  const formattedLikesCount = formatCount(post.likes_count, t);
  const formattedCommentsCount = formatCount(post.comments_count, t);

  const togglePostLike = useToggleLike();
  function handleLike() {
    togglePostLike.mutate(post.id);
  }
  
  function handleNavigation() {
    if(user.id === post.user.id) {
      navigate(`/profile/me`, {
        replace: true,
      });
    } else {
      navigate(`/users/${post.user.id}`, {
        replace: true,
      });
    }
  }

  const categoryColor =
    postTagStyling(post.category.toLowerCase()) ??
    "bg-gray-100 text-gray-700";
  const profileBorderColor =
    getBorderColor(post.user?.diabetes_type?.toLowerCase()) ??
    "border-2 border-gray-300";

  return (
    <div
      className="w-full min-w-0 shadow-lg flex-col-start gap-8 border p-4 md:p-6 rounded-2xl overflow-hidden
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
    >
      {/* user info */}
      <div className="flex justify-between items-center w-full">
        <div className="flex-start gap-4">
          <div
            className={`w-12 h-12 border-2 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
          >
            <img src={post.user?.profile_picture} alt="profile_picture" />
          </div>
          <div className="flex-col-start">
            <p 
            onClick={handleNavigation}
            className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold hover:underline cursor-pointer">
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
      <div className="flex flex-col gap-4 w-full text-start px-2 overflow-hidden">
        {/* Added whitespace-pre-wrap to make sure long headers or continuous words wrap properly */}
        <h3 className="text-[#161A41] dark:text-white break-words whitespace-pre-wrap">
          {post.title}
        </h3>

        {/* Added whitespace-pre-wrap to force normal body words or overflow text to drop clean to the next line */}
        <p className="text-[#3B3D53] dark:text-gray-300 text-sm sm:text-base break-words whitespace-pre-wrap">
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
                state: { post, from: location.pathname + location.search },
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