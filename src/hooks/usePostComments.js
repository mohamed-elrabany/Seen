import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getPostComments } from "../services/communityServices";

export function usePostComments(postId) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [moreComments, setMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setComments([]);
    setPage(1);
    setMoreComments(true);
  }, [postId]);

  // usePostComments.js corrections
useEffect(() => {
    const fetchComments = async () => {
      if (!moreComments || isLoading || !postId) return;
      setIsLoading(true);
      try {
        const batch = await getPostComments(postId, page);
        console.log(`Fetched comments for post ${postId}, page ${page}:`, batch);
        
          if (batch && batch.length > 0) {
            setComments((prev) => {
              // Prevent duplicates just in case
              const existingIds = new Set(prev.map(c => c.id));
              const uniqueNew = batch.filter(c => !existingIds.has(c.id));
              return [...prev, ...uniqueNew];
            });
          } else {
            setMoreComments(false);
          }

      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch comments!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [page, postId]); // Correctly triggers when page changes

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

  function addComment(text, currentUser) {
    if (!currentUser) {
    console.error("No user found in Redux state!");
  }
    console.log(currentUser);
    const temp = {
      id: `temp-${Date.now()}`,
      comment_text: text,
      user: currentUser,
      likes_count: 0,
      is_liked: false,
      pending: true,
    };
    setComments((prev) => [temp, ...prev]);
    return temp.id;
  }

  function confirmComment(tempId, newComment) {
    setComments((prev) =>
      prev.map((comment) => (comment.id === tempId ? newComment : comment)),
    );
  }

  function rejectComment(tempId) {
    setComments((prev) => prev.filter((comment) => comment.id !== tempId));
  }

  function toggleCommentLike(commentId) {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              is_liked: !comment.is_liked,
              likes_count: comment.is_liked
                ? comment.likes_count - 1
                : comment.likes_count + 1,
            }
          : comment,
      )
    );
  }

  // returns snapshot for caller to use in rollback
  function deleteComment(commentId) {
    const snapshot = comments.find((c) => c.id === commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    return snapshot;
  }

  function restoreComment(snapshot) {
    setComments((prev) =>
      [...prev, snapshot].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      ),
    );
  }

  function editComment(commentId, newText) {
    const snapshot = comments.find((c) => c.id === commentId);
    setComments((prev) =>
      prev.map((c) =>
        c.id !== commentId ? c : { ...c, comment_text: newText, editing: true },
      ),
    );
    return snapshot;
  }

  function confirmEdit(commentId) {
    setComments((prev) =>
      prev.map((c) => (c.id !== commentId ? c : { ...c, editing: false })),
    );
  }

  function rejectEdit(snapshot) {
    setComments((prev) =>
      prev.map((c) => (c.id !== snapshot.id ? c : snapshot)),
    );
  }

  return {
    comments,
    isLoading,
    moreComments,
    setPage,
    addComment,
    confirmComment,
    rejectComment,
    toggleCommentLike,
    deleteComment,
    restoreComment,
    editComment,
    confirmEdit,
    rejectEdit,
  };
}
