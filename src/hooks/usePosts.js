import { useEffect, useState, useCallback } from "react";
import { getPostsData, getUserPosts } from "../services/communityServices";
import toast from "react-hot-toast";

export function usePosts({ category = null, profileId = null }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [moreData, setMoreData] = useState(true);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        setMoreData(true);
        document.documentElement.scrollTop = 0; // Reset scroll position when category/profile changes
    }, [category, profileId]);

    useEffect(() => {
        if (!moreData) return;

        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const data = profileId
                    ? await getUserPosts(profileId, page)
                    : await getPostsData(category, page);

                if (data.length === 0) {
                    setMoreData(false);
                }

                setPosts((prevPosts) => {
                    const newPosts = data.filter(
                        (post) => !prevPosts.some((p) => p.id === post.id)
                    );

                    return [...prevPosts, ...newPosts];
                });
            } catch (error) {
                toast.error("Failed to load posts.");
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page, category, profileId, moreData]);

    const handleScroll = useCallback(() => {
        if (isLoading || !moreData) return;

        const isAtBottom =
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100;

        if (isAtBottom) {
            setPage((prev) => prev + 1);
        }
    }, [isLoading, moreData]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return {
        posts,
        isLoading,
        moreData,
    };
}