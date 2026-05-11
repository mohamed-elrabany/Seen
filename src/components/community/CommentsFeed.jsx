import { useState, useEffect, useCallback } from "react";
import { getPostComments } from "../../services/communityServices";
import PostComment from "./PostComment";
import { CommentSkeleton } from "./SkeletonLoading";
import toast from "react-hot-toast";

export default function CommentsFeed({ postId }) {
  const [loadedComments, setLoadedComments] = useState([]);
  const [page, setPage] = useState(1);
  const [moreComments, setMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  

  // 1. Reset state when postId changes
  useEffect(() => {
    setLoadedComments([]);
    setPage(1);
    setMoreComments(true);
  }, [postId]);

  // 2. Fetch comments logic (Fixed async handling)
  useEffect(() => {
    // Only fetch if we have more comments and aren't already loading
    if (!moreComments || isLoading) return;

    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const comments = await getPostComments(postId, page);
        console.log("Fetched comments:", comments);
        
        if (comments && comments.length > 0) {
          setLoadedComments((prevData) => [...prevData, ...comments]);
        } else {
          setMoreComments(false);
        }
      } catch (error) {
        toast.error("Failed to fetch comments!");
        console.error(error);
        // Avoid throwing errors inside useEffect; handle via state instead
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [page, postId]); // Added postId to dependencies

  // 3. Optimized Scroll Handler
  const handleScroll = useCallback(() => {
    if (isLoading || !moreComments) return;

    const isAtBottom = 
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - 200; // Increased buffer

    if (isAtBottom) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, moreComments]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full mt-8 pb-8 space-y-4">
      {loadedComments.map((comment, index) => (
        // Note: Better to use comment.id than index if available
        <PostComment key={`${comment.id}-${index}`} comment={comment} />
      ))}
      
      {isLoading && Array.from({ length: 2 }).map((_, index) => <CommentSkeleton key={index} />)}
      
      {!moreComments && loadedComments.length > 0 && (
        <p className="w-full bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white font-semibold text-center p-4 rounded-2xl shadow-lg">
          No more comments
        </p>
      )}
    </div>
  );
}