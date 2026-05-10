import { MdClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

import {
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  getPostById, addPostComment
} from "../../services/communityServices";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useTranslation } from "react-i18next";

import toast from "react-hot-toast";

import PostCard from "../../components/community/PostCard";
import CommentsFeed from "../../components/community/CommentsFeed";
import Button from "../../components/ui/Button";

import { posts } from "../../util/content";

export default function PostDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const cachedPost = location.state?.post;

  const [post, setPost] = useState(cachedPost);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { postId } = useParams();

  const onClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/community");
    }
  };

  useEffect(() => {
    if (cachedPost) return;

    const getPostDetails = async () => {
      try {
        const postData = await getPostById(postId);

        if (postData) {
          setPost(postData);
        } else {
          setPost(posts[5]);
        }

      } catch (error) {
        toast.error("Something went wrong!");

        console.error(
          "Error fetching post details:",
          error
        );
      }
    };

    getPostDetails();

  }, [postId, cachedPost]);

  async function handleCommentSubmit() {
    if(comment.trim() === "") return;

    setIsSubmitting(true);
    try{
      await addPostComment(postId, { content: comment });
      setComment("");
      toast.success("Comment added successfully!");
    }catch(error){
      toast.error("Failed to submit comment!");
    }finally{
      setIsSubmitting(false);
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {post && (
              <PostCard post={post} />
            )}

            <CommentsFeed postId={postId} />

          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-[#161A41] flex-shrink-0">
            <div className="grid grid-cols-6 items-end justify-center gap-3">

              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Write a comment..."
                rows={1}
                className="w-full h-full col-span-5 bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"></textarea>

              <button
                type='submit'
                disabled={comment.trim() === "" || isSubmitting}
                onClick={handleCommentSubmit}
                className={`w-full col-span-1 px-6 py-4 transition-all flex items-center justify-center rounded-lg gap-2 ${
                !comment.trim() || isSubmitting
              ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
              : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
          }`}
              >
                <RiSendPlaneFill className={`w-4 h-4 ${i18n.language === 'ar' ? "-rotate-90" : "rotate-0"}`} />
              </button>

            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}