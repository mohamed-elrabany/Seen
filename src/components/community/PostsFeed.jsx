import PostCard from "./PostCard";

import { posts } from "../../util/content";
import { getPostsData } from "../../services/communityServices";
import { CommunityPostSkeleton } from "./SkeletonLoading";

import { useState, useEffect, useCallback } from "react";

export default function PostFeed({ category }) {
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Reset everything when category changes
  useEffect(() => {
    setLoadedData([]);
    setPage(1);
    setMoreData(true);
    setIsLoading(true);
  }, [category]);

  // Fetch whenever page changes (page is set by scroll or category reset)
  useEffect(() => {
    if (!moreData) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const posts = await getPostsData(category, page);
        console.log("Fetched posts from feed:", posts);
        if (posts?.length > 0) {
          setLoadedData((prevData) => [...prevData, ...posts]);
        } else {
          setMoreData(false);
        }
      } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch posts!'; 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll= useCallback(()=>{
    if(isLoading || !moreData) return;

    const isAtBottom= (window.innerHeight + document.documentElement.scrollTop) >=
      (document.documentElement.offsetHeight - 100);

      if(isAtBottom){
        setPage( prev => prev + 1);
      }
  },[isLoading, moreData])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex-col-center gap-8 overflow-y-auto w-full px-4 pb-4">
      {loadedData.map((post, index) => (
        <PostCard
          key={`${post.id}-${index}`}
          post={post}
        />
      ))}

       {isLoading && Array.from({ length: 2 }).map((_, index) => <CommunityPostSkeleton key={index} />)}

      {!moreData && <p className="w-full bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white font-semibold text-center p-4 rounded-2xl shadow-lg">No more posts</p>}
    </div>
  );
}
