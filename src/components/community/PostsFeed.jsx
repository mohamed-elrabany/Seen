import PostCard from "./PostCard";
import { CommunityPostSkeleton } from "./SkeletonLoading";
import { useEffect, useRef } from "react";

import { useCommunityPosts } from "../../hooks/queries/useCommunityPosts";
import { useProfilePosts } from "../../hooks/queries/useProfilePosts";

export default function PostFeed({ category = null, profileId = null }) {
  useEffect(() => {
    document.documentElement.scrollTop = 0; // Reset scroll position when category/profile changes
  }, [category, profileId]);
  const observerRef = useRef();

  const query = profileId
    ? useProfilePosts(profileId)
    : useCommunityPosts(category);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  // flatten pages (array of arrays)
  const posts = data?.pages.flat() || [];
  console.log("PostsFeed rendered with posts:", posts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex-col-center gap-8 overflow-y-auto w-full pb-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: 2 }).map((_, i) => (
          <CommunityPostSkeleton key={i} />
        ))}

      {!hasNextPage && (
        <p className="w-full text-center text-gray-400">No more posts</p>
      )}

      <div ref={observerRef} className="h-10" />
    </div>
  );
}
