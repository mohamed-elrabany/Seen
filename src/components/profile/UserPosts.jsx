import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";

import { getUserPosts } from "../../services/communityServices";
import PostCard from "../community/PostCard";
import { CommunityPostSkeleton } from "../community/SkeletonLoading";

export default function UserPosts() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Use a Ref as a "Lock" (State is too slow to stop rapid scroll events)
  const isFetching = useRef(false);

  const fetchData = useCallback(async () => {
    // If we are already fetching or there's no more data, abort
    if (isFetching.current || !moreData) return;

    isFetching.current = true;
    setIsLoading(true);

    try {
      const posts = await getUserPosts(user?.id, page);
      console.log(`Fetched page ${page}:`, posts);

      if (posts?.length > 0) {
        setLoadedData((prevData) => {
          // 2. Double-check for duplicates by ID just in case
          const newPosts = posts.filter(
            (post) => !prevData.some((existing) => existing.id === post.id)
          );
          return [...prevData, ...newPosts];
        });
      } else {
        setMoreData(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
      isFetching.current = false; // 3. Unlock after request finishes
    }
  }, [user?.id, page, moreData]);

  useEffect(() => {
    fetchData();
  }, [page]); // Only triggers when page changes

  const handleScroll = useCallback(() => {
    // Don't trigger if we are already loading or out of data
    if (isLoading || isFetching.current || !moreData) return;

    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200; // Trigger slightly earlier

    if (isAtBottom) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, moreData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <h2 className="text-[#161A41] dark:text-white mb-4">Posts</h2>
      <div className="flex flex-col items-center gap-8 w-full px-4 pb-4">
        {loadedData.map((post, index) => (
          <PostCard key={`${post.id}-${index}`} post={post} />
        ))}

        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <CommunityPostSkeleton key={index} />
          ))}

        {!moreData && loadedData.length > 0 && (
          <p className="w-full bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white font-semibold text-center p-4 rounded-2xl shadow-lg">
            No more posts
          </p>
        )}
      </div>
    </motion.div>
  );
}