import PostCard from "./PostCard";
import { CommunityPostSkeleton } from "./SkeletonLoading";
import { useEffect, useRef } from "react";
import { usePosts } from "../../hooks/usePosts";

// Store scroll position outside component so it survives unmount
const scrollPositions = {};

export default function PostFeed({ category = null, profileId = null }) {
  const feedKey = `${category ?? "null"}::${profileId ?? "null"}`;
  const { posts, isLoading, moreData, handlePostLike } = usePosts(category, profileId);
  const containerRef = useRef(null);
  const hasRestored = useRef(false);

  // Restore scroll after posts paint
  useEffect(() => {
    if (posts.length > 0 && !hasRestored.current && scrollPositions[feedKey]) {
      // rAF ensures the DOM has painted the posts before we scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositions[feedKey]);
        hasRestored.current = true;
      });
    }
  }, [posts, feedKey]);

  // Save scroll on unmount
  useEffect(() => {
    return () => {
      scrollPositions[feedKey] = window.scrollY;
      hasRestored.current = false;
    };
  }, [feedKey]);

  return (
    <div ref={containerRef} className="flex-col-center gap-8 overflow-y-auto w-full px-4 pb-4">
      {posts.map((post, index) => (
        <PostCard
          key={`${post.id}-${index}`}
          post={post}
          onLike={() => handlePostLike(post.id)}
        />
      ))}

      {isLoading && Array.from({ length: 2 }).map((_, i) => <CommunityPostSkeleton key={i} />)}

      {!moreData && (
        <p className="w-full text-[#808080] dark:text-gray-400 font-semibold text-center p-4">
          No more posts
        </p>
      )}
    </div>
  );
}