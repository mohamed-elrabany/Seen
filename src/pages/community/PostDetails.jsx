import { MdClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { usePostComments } from "../../hooks/usePostComments";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostById,
  addPostComment,
  likeComment,
  editPostComment,
  deletePostComment,
  likePost,
} from "../../services/communityServices";

import toast from "react-hot-toast";

import PostCard from "../../components/community/PostCard";
import CommentsFeed from "../../components/community/CommentsFeed";
import Button from "../../components/ui/Button";

import { posts } from "../../util/content";


export default function PostDetails() {
  const user = useSelector((state) => state.user.user);
  console.log("Redux User Object:", user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const cachedPost = location.state?.post;

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        // 100px buffer
        if (!isLoading && moreComments) {
          setPage((prev) => prev + 1);
        }
      }
    }
  };

  const [post, setPost] = useState(cachedPost);
  // const reduxPosts = useSelector((state) => state.posts.posts);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const {
    comments,
    addComment,
    toggleCommentLike,
    confirmComment,
    rejectComment,
    editComment,
    confirmEdit,
    rejectEdit,
    deleteComment,
    restoreComment,
    setPage,
    isLoading,
    moreComments,
  } = usePostComments(post?.id);

  const onClose = () => {
    // Check if we know exactly which page opened this modal
    const returnPath = location.state?.from;

    if (returnPath) {
      navigate(returnPath);
    } else {
      // Hard fallback if they refreshed the page while the modal was open
      navigate("/community");
    }
  };

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const postData = await getPostById(postId);

        if (postData) {
          setPost(postData);
        } else if (!post) {
          setPost(posts[5]);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Error fetching post details:", error);
      }
    };

    getPostDetails();
  }, [postId]);

  async function handleCommentSubmit(comment_text) {
    const tempId = addComment(comment_text, user); // Optimistic UI update
    setIsSubmitting(true);
    setComment(""); // Clear input immediately for better UX
    setPost((prev) => {
      return {
        ...prev,
        comments_count: prev.comments_count + 1, // Optimistically increment comment count
      };
    });
    try {
      const newComment = await addPostComment(postId, comment_text);
      confirmComment(tempId, newComment);
      toast.success("Comment added successfully!");
    } catch (error) {
      rejectComment(tempId);
      setComment(comment_text); // Restore text so user doesn't lose it
      setPost((prev) => {
        return {
          ...prev,
          comments_count: prev.comments_count - 1, // Rollback comment count
        };
      });
      toast.error("Failed to submit comment!");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCommentLikeToggle(commentId) {
    toggleCommentLike(commentId); // Optimistic UI update

    try {
      const comment = await likeComment(commentId);
    } catch (error) {
      toggleCommentLike(commentId);
      toast.error("Failed to toggle like!");
    }
  }

  async function handleEditComment(commentId, newText) {
    console.log("Editing comment:", commentId, newText);
    const snapshot = editComment(commentId, newText); // Optimistic UI update
    try {
      const updatedComment = await editPostComment(commentId, newText);
      console.log("Updated comment from server:", updatedComment);
      confirmEdit(snapshot.id);
      toast.success("Comment edited successfully!");
    } catch (error) {
      rejectEdit(snapshot);
      console.error("Failed to edit comment:", error);
      toast.error("Failed to edit comment!");
    }
  }

  async function handleDeleteComment(commentId) {
    const snapshot = deleteComment(commentId); // Optimistic UI update
    setPost((prev) => {
      return {
        ...prev,
        comments_count: prev.comments_count - 1, // Optimistically decrement comment count
      };
    });
    try {
      await deletePostComment(commentId);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      setPost((prev) => {
        return {
          ...prev,
          comments_count: prev.comments_count + 1, // Rollback comment count
        };
      });
      restoreComment(snapshot);
      toast.error("Failed to delete comment!");
      console.error("Failed to delete comment:", error);
    }
  }

  function toggleMainPostLike() {
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        is_liked: !prev.is_liked,
        likes_count: prev.is_liked ? Math.max(0, prev.likes_count - 1) : prev.likes_count + 1,
      };
    });
  }

  async function handleMainPostLike() {
    console.log("Toggling like for post ID:", postId);
    console.log("Redux posts:", reduxPosts);
    
    // Save previous state structure for exact manual rollback if necessary
    const fallbackPost = { ...post };
    
    // 1. Fire local UI changes straight away
    toggleMainPostLike(); 
    
    try {
      const result = await likePost(postId);
      console.log("Like post result:", result);
      
      // 2. Override local state explicitly using accurate status from backend payload
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          is_liked: result.liked,
          likes_count: typeof result.likes_count === 'number' 
            ? result.likes_count 
            : (result.liked ? fallbackPost.likes_count + 1 : Math.max(0, fallbackPost.likes_count - 1))
        };
      });

      // 3. Keep Redux post slice in sync with details changes
      if (postActions && postActions.updatePostLike) {
        dispatch(postActions.updatePostLike({ postId: Number(postId), is_liked: result.liked }));
      }
      
    } catch (error) {
      // Rollback to reliable historic data structure
      setPost(fallbackPost);
      console.error("Failed to toggle like:", error);
      toast.error("Failed to toggle like!");
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            y: 20,
          }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-[#161A41] w-full max-w-2xl h-[90dvh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex-shrink-0">
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-lg font-bold text-[#161A41] dark:text-white mb-0">
                {post?.user?.first_name || "Unknown User"}'s post
              </h3>
            </div>

            <button
              onClick={onClose}
              className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:scale-110 transition-all"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
          >
            {post && <PostCard post={post} onLike={handleMainPostLike} />}

            <CommentsFeed
              comments={comments}
              isLoading={isLoading}
              moreComments={moreComments}
              onLikeComment={handleCommentLikeToggle}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
            />
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-[#161A41] flex-shrink-0">
            <div className="grid grid-cols-6 items-end justify-center gap-3">
              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                rows={1}
                className="w-full h-full col-span-5 bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
              ></textarea>

              <button
                type="submit"
                disabled={comment.trim() === "" || isSubmitting}
                onClick={() => handleCommentSubmit(comment)}
                className={`w-full col-span-1 px-6 py-4 transition-all flex items-center justify-center rounded-lg gap-2 ${
                  !comment.trim() || isSubmitting
                    ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                    : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
                }`}
              >
                <RiSendPlaneFill
                  className={`w-4 h-4 ${i18n.language === "ar" ? "-rotate-90" : "rotate-0"}`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}