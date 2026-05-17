import PostCard from "./PostCard";
import { CommunityPostSkeleton } from "./SkeletonLoading";
import { useEffect, useRef } from "react";
import { usePosts } from "../../hooks/usePosts";

// Store scroll position outside component so it survives unmount
const scrollPositions = {};

export default function PostFeed({ category = null, profileId = null }) {
  const { posts, isLoading, moreData } = usePosts({category, profileId});

  return (
    <div className="flex-col-center gap-8 overflow-y-auto w-full px-4 pb-4">
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