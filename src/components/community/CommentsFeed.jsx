import { useState, useEffect, useCallback, useRef } from "react";
import { getPostComments } from "../../services/communityServices";

import PostComment from "./PostComment";
import { CommentSkeleton } from "./SkeletonLoading";

import { posts } from "../../util/content";

export default function CommentsFeed({ postId }) {
  const [loadedomments, setLoadedComments] = useState([]);
  const [page, setPage] = useState(1);
  const [moreComments, setMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoadedComments([]);
    setPage(1);
    setMoreComments(true);
  }, [postId]);

  useEffect(() => {
    if (!moreComments) return;
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await getPostComments(postId, page);
        if (response?.comments?.length > 0) {
          setLoadedComments((prevData) => [...prevData, ...response]);
        } else {
          setMoreComments(false);
        }
      } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch comments!';
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [page]);

  const handleScroll= useCallback(()=>{
    const isAtBottom= (window.innerHeight + document.documentElement.scrollTop) >=
      (document.documentElement.offsetHeight - 100);

      if(isAtBottom){
        setPage( prev => prev + 1);
      }
  },[isLoading, moreComments])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
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
      {/* {isLoading && <CommentSkeleton />} */}
      {!moreComments && <p className="w-full bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white font-semibold text-center p-4 rounded-2xl shadow-lg">No more comments</p>}
    </div>
  );
}
