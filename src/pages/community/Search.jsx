import { MdClose } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import PostIcon from "../../components/ui/PostIcon";
import emptyImg from "../../assets/search-empty.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { search as fetchSearchResults } from "../../services/communityServices"; 
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Input from "../../components/ui/Input";
import PostCard from "../../components/community/PostCard";

export default function Search() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchCategory, setSearchCategory] = useState("posts");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ posts: [], users: [] }); 
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 1. Reset everything when the query changes (New search session)
  useEffect(() => {
    setResults({ posts: [], users: [] });
    setPage(1);
    setHasMore(true);
  }, [query]);

  // 2. Fetch Logic with Internal Debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], users: [] });
      return;
    }

    const handleFetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchSearchResults(query, page);
        console.log("Search results:", response);
        
        setResults(prev => ({
          // If page 1, replace results. If page > 1, append new results
          posts: page === 1 ? response.posts.data : [...prev.posts, ...response.posts.data],
          users: page === 1 ? response.users : [...prev.users, ...response.users]
        }));

        // Basic check to see if we should stop fetching
        const totalFetched = (response.posts?.length || 0) + (response.users?.length || 0);
        if (totalFetched === 0) setHasMore(false);

      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      handleFetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]); // Only trigger on query or page change

  // 3. Scroll Handler for the Modal's Internal Div
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Trigger when user is 50px from the bottom
    const isBottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (isBottom && !isLoading && hasMore && query.trim()) {
      setPage(prev => prev + 1);
    }
  };

  const onClose = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/community");
  };

  const profileBorderColorMap= {
    type1: "border-2 border-[#ef4444]",
    type2: "border-2 border-[#3b82f6]",
    mody: "border-2 border-[#f97316]",
    lada: "border-2 border-[#22c55e]",
    gestational: "border-2 border-[#a855f7]",
  };

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
          initial={{ scale: 0.80, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.80, opacity: 0, y: -40 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, duration: 1, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-[#161A41] w-full max-w-2xl h-[85dvh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#6976EB]/20 rounded-lg text-[#6976EB]">
                    <IoSearch className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white mb-0">{t("Search")}</h3>
               </div>
               <button onClick={onClose} className="text-gray-400 hover:scale-110 transition-all cursor-pointer">
                 <MdClose className="w-6 h-6" />
               </button>
            </div>

            <div className="relative mb-4">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                type="text"
                value={query}
                placeholder="Search for posts or people..."
                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg outline-none transition-all focus:border-[#6976EB] dark:bg-transparent dark:text-white"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              {['posts', 'profiles'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border border-[#6976EB] ${
                    searchCategory === (cat === 'profiles' ? 'profiles' : 'posts') 
                    ? "bg-[#6976EB] text-white shadow-lg shadow-[#6976EB]/30" 
                    : "bg-[#6976EB]/10 text-[#6976EB] hover:bg-[#6976EB]/20"
                  }`}
                >
                  <span className="uppercase tracking-wider">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Area */}
          <div 
            onScroll={handleScroll} 
            className="flex-1 overflow-y-auto p-6 pt-4 no-scrollbar"
          >
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {isLoading && page === 1 ? "Searching..." : "Results"}
              </h4>

              {/* Display Logic based on selected Category */}
              {(searchCategory === "posts" ? results.posts.length > 0 : results.users.length > 0) ? (
                <motion.div 
                  className="space-y-4 flex flex-col items-stretch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {searchCategory === "posts" ? (
                    results.posts.map((post, index) => (
                      <PostCard key={`${post.post_id}-${index}`} post={post} />
                    ))
                  ) : (
                    results.users.map((profile, index) => (
                      <motion.div 
                      whileHover={{y: -10, scale: 1.05}}
                      key={`${profile.id}-${index}`} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/10">
                        <div className={`w-12 h-12 ${profileBorderColorMap[profile.diabetes_type?.toLowerCase()] || "border-2 border-[#6976EB]"} rounded-full overflow-hidden shrink-0`}>
                          <img src={profile.profile_picture} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="mb-0 text-[#161A41] dark:text-white font-bold">{profile.full_name}</h4>
                          <p className="text-xs text-gray-500 uppercase">{profile.diabetes_type || "Member"}</p>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {isLoading && page > 1 && (
                    <div className="py-4 text-center text-sm text-gray-400">Loading more...</div>
                  )}
                </motion.div>
              ) : !isLoading && query && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <img src={emptyImg} alt="" className="w-40 opacity-60 mb-4" />
                  <h4 className="dark:text-white">No {searchCategory} found</h4>
                  <p className="text-sm text-gray-500">Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}