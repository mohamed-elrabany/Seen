import { useState, useEffect, useCallback } from "react";
import { getPostComments } from "../../services/communityServices";
import PostComment from "./PostComment";
import { CommentSkeleton } from "./SkeletonLoading";
import toast from "react-hot-toast";

export default function CommentsFeed({ comments, isLoading, moreComments, onLikeComment, onDeleteComment, onEditComment }) {

  return (
    <div className="w-full mt-8 pb-8 space-y-4">
      {comments.map((comment, index) => (
        // Note: Better to use comment.id than index if available
        <PostComment key={comment.id} comment={comment} onLike={() => onLikeComment(comment.id)} onDelete={() => onDeleteComment(comment.id)} onEdit={onEditComment} />
      ))}
      
      {isLoading && Array.from({ length: 2 }).map((_, index) => <CommentSkeleton key={index} />)}
      
      {/* {!moreComments && comments.length > 0 && (
        <p className="w-full bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white font-semibold text-center p-4 rounded-2xl shadow-lg">
          No more comments
        </p>
      )} */}
    </div>
  );
}