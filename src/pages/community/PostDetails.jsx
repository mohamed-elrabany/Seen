import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getPostComments } from "../../services/communityServices";

import i18next from "i18next";
import PostCard from "../../components/community/PostCard";
import PostComment from "../../components/community/PostComment";

import { posts } from "../../util/content";

export default function PostDetails() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  return (
    <div className="overflow-y-auto flex flex-col w-full min-h-screen">
      <Link
        to="/community"
        className="bg-white p-3 rounded-lg shadow-lg self-start mb-4"
      >
        <IoArrowBack
          className={`${i18next.language === "ar" ? "rotate-180" : ""} w-5 h-5`}
        />
      </Link>
      
      <PostCard
        key={posts[5]}
        title={posts[5].title}
        body={posts[5].body}
        images={posts[5].images}
        category={posts[5].category}
        isLiked={posts[5].isLiked}
        isOwner={posts[5].isOwner}
        likesCount={posts[5].likesCount}
        commentsCount={posts[5].commentsCount}
        hashtags={posts[5].hashtags}
        dueDate={posts[5].dueDate}
        user={posts[5].user}
      />

      {/* comments list */}
      <div className="w-full mt-8 pb-28">
        {posts[5].comments.map((comment, index) => (
          <PostComment
            key={index}
            id={comment.id}
            content={comment.content}
            isLiked={comment.isLiked}
            likesCount={comment.likesCount}
            dueDate={comment.dueDate}
            user={comment.user}
          />
        ))}
      </div>

      {/* comment input bar */}
      <div className="flex items-end gap-3 w-full bg-white fixed bottom-0 p-4 border-t border-[#D9D9D9]/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {/* avatar */}
        <div className="w-10 h-10 bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0 mb-1">
          <img src={posts[1].user?.avatar} alt="" />
        </div>

        {/* textarea wrapper */}
        <div className="flex-1 relative bg-[#F4F5FF] rounded-2xl border border-[#D9D9D9]/50 focus-within:border-[#6976EB] transition-all">
          <textarea
            name="body"
            id="post-body"
            rows={1}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              // auto grow
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            placeholder="اكتب تعليقاً..."
            className="w-full bg-transparent text-[#161A41] rounded-2xl px-4 py-3 pr-12
              text-sm sm:text-base font-semibold outline-none resize-none transition-all
              placeholder:text-[#808080] placeholder:font-normal"
          />

          {/* send button inside textarea */}
          <button
            type="button"
            disabled={!comment.trim()}
            className={`absolute left-3 bottom-2.5 p-1.5 rounded-full transition-all
              ${
                comment.trim()
                  ? "text-[#6976EB] hover:bg-[#6976EB]/10 cursor-pointer"
                  : "text-[#D9D9D9] cursor-not-allowed"
              }`}
          >
            <IoSend className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
