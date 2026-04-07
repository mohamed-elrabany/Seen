import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

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
  return (
    <div className="w-full bg-white shadow-lg flex-col-start gap-8 border border-[#D9D9D9]/30 p-8 rounded-2xl">
      {/* user info */}
      <div className="flex justify-between items-center w-full">
        <div className="flex-start gap-4">
          <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0">
            <img src={user.avatar} alt="" />
          </div>
          <div className="flex-col-start">
            <p className="text-[#161A41] text-sm sm:text-base font-bold">
              {user.name}
            </p>
            <p className="text-[#808080] text-xs sm:text-sm">{dueDate}</p>
          </div>
        </div>
        <p className="px-4 py-2 text-center font-bold text-red-700 rounded-full bg-red-400/30">
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
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="text-sm font-medium text-[#6976EB] bg-[#E0E3FF] px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* post status section */}
      <div className="flex-start w-full gap-4 pt-3 border-t border-[#D9D9D9]/50">
        <button className="flex-center text-[#808080] w-auto gap-2 hover:text-[#6976EB] transition-colors">
          <FaRegHeart className="w-5 h-5" />
          <span>30.1K</span>
        </button>
        <button className="flex-center w-auto gap-2 text-[#808080] hover:text-[#6976EB] transition-colors">
          <FaRegComment className="w-5 h-5" />
          <span>1.2K</span>
        </button>
      </div>
    </div>
  );
}
