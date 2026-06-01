import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

import { formatCount } from "../../util/formatPostStatus";
import { formatRelativeTime } from "../../util/formatRelativeTime";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";

import LikesModal from "../modals/LikesModal";

export default function PostComment({ comment, onLike, onDelete, onEdit }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [editComment, setEditComment] = useState(comment.comment_text);
  const [isEditing, setIsEditing] = useState(false);
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

  // Use the correct keys from your console log
  const formattedLikesCount = formatCount(comment.likes_count, t);
  const relativeDate = formatRelativeTime(comment.created_at);

    function handleNavigation() {
    if(user.id === comment.user.id) {
      navigate(`/profile/me`, {
        replace: true,
      });
    } else {
      navigate(`/users/${comment.user.id}`, {
        replace: true,
      });
    }
  }

  const profileBorderColorMap = {
    type1: "border-2 border-red-700 dark:border-red-400",
    type2: "border-2 border-blue-700 dark:border-blue-400",
    mody: "border-2 border-orange-700 dark:border-orange-400",
    lada: "border-2 border-green-700 dark:border-green-400",
    gestational: "border-2 border-purple-700 dark:border-purple-400",
  };

  const profileBorderColor =
    profileBorderColorMap[comment.user?.diabetes_type?.toLowerCase()] ??
    "border-2 border-gray-300";
  console.log("User name:", comment.user?.first_name, comment.user?.last_name);

  return (
    <div className="flex-col-start w-full gap-4 last:border-b-0 border-b border-[#D9D9D9]/20 p-4">
      <div className="flex-between w-full">
        <div className="flex-start gap-4">
          <div
            className={`w-12 h-12 ${profileBorderColor} bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0`}
          >
            {/* Note: In your log it's profile_picture, not avatar. Check this: */}
            <img
              src={comment.user?.profile_picture || comment.user?.avatar}
              alt=""
            />
          </div>
          <div className="flex-col-start">
            <p 
            onClick={handleNavigation}
            className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold hover:underline cursor-pointer">
              {comment.user?.first_name} {comment.user?.last_name}
            </p>
            <p className="text-[#808080] dark:text-white/30 text-xs sm:text-sm">
              {relativeDate}
            </p>
          </div>
        </div>

        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          // Animate based on the prop, not local state
          animate={comment.is_liked ? { scale: [1.2, 1] } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          
          className="flex-col-center text-[#808080] dark:text-gray-400 w-auto gap-2 hover:text-[#6976EB] transition-colors cursor-pointer"
        >
          {comment.is_liked ? (
            <FaHeart onClick={onLike} className="w-5 h-5 text-red-600" />
          ) : (
            <FaRegHeart onClick={onLike} className="w-5 h-5" />
          )}
          <span onClick={()=>setIsLikesModalOpen(true)} className={`w-5 ${comment.is_liked ? "text-red-600" : ""}`}>
            {formattedLikesCount}
          </span>
        </motion.button>
      </div>
      {!isEditing ? (
        /* Display Mode */
        <p className="w-full text-[#808080] dark:text-gray-400 break-words">
          {comment.comment_text}
        </p>
      ) : (
        /* Edit Mode */
        <div className="w-full p-4 bg-white dark:bg-[#161A41] flex-shrink-0 rounded-lg">
          <div className="grid grid-cols-6 items-end gap-3">
            <textarea
              autoFocus
              name="comment"
              id="comment"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              placeholder="Edit your comment..."
              rows={2}
              className="w-full h-full col-span-5 bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400 border border-transparent focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all resize-none"
            />

            <div className="col-span-1 flex flex-col grid gap-2">
              <button
                type="button"
                disabled={!editComment.trim() || editComment === comment.comment_text}
                onClick={() => {onEdit(comment.id, editComment); setIsEditing(false); setEditComment(comment.comment_text)}}
                className={`w-full p-2 transition-all flex items-center justify-center rounded-lg ${
                  !editComment.trim() || editComment === comment.comment_text
                    ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                    : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
                }`}
              >
                <RiSendPlaneFill
                  className={`w-5 h-5 ${i18n.language === "ar" ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {/* Cancel Button - Optional but recommended */}
              <button
                onClick={() => {setIsEditing(false); setEditComment(comment.comment_text)}}
                className="w-full text-sm p-2 transition-all flex items-center justify-center rounded-lg
                bg-[#808080]/20 text-[#808080] dark:bg-[#D9D9D9]/20 dark:text-[#D9D9D9] cursor-pointer hover:bg-[#808080]/30 dark:hover:bg-[#D9D9D9]/30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {comment.user.id === user?.id && !isEditing && (
        <div className="flex gap-2 justify-end items-center w-full">
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer p-2 text-center rounded-md hover:bg-gray-300 dark:hover:bg-gray-900/30"
          >
            <FiEdit className="text-gray-700 dark:text-gray-300 w-5 h-5" />
          </button>
          <button
            className="cursor-pointer p-2 text-center rounded-md hover:bg-red-100 dark:hover:bg-[#FB2C36]/20"
            onClick={onDelete}
          >
            <RiDeleteBin6Line className="text-[#FB2C36] w-5 h-5" />
          </button>
        </div>
      )}
      <LikesModal
        isOpen={isLikesModalOpen}
        onClose={() => setIsLikesModalOpen(false)}
        id={comment.id}
        type="comment"
      />
    </div>
  );
}
