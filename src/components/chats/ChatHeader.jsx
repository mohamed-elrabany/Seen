import Header from "../layout/Header";
import Input from "../ui/Input";

import { PiChatCircleTextBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { friendsSearch } from "../../services/chatsServices";
import { getBorderColor } from "../../util/community/ctaegoryColors";
import toast from "react-hot-toast";

const DUMMY_RESULTS = [
  {
    id: "user-1",
    first_name: "Ahmed",
    last_name: "Ali",
    diabetes_type: "Type1",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: "user-2",
    first_name: "Sarah",
    last_name: "Hassan",
    diabetes_type: "Type2",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "user-3",
    first_name: "Omar",
    last_name: "Khaled",
    diabetes_type: "Gestational",
    profile_picture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
  },
];

export default function ChatHeader() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Added tracking state
  
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it entirely
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset pagination state when search term resets or changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (!searchTerm.trim()) {
      setSearchResults(DUMMY_RESULTS); // Show default fallback when clean
    } else {
      setSearchResults([]);
    }
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [searchTerm]);

  // Handle Search Fetching & Debounce Safely
  useEffect(() => {
    if (!searchTerm.trim()) return;

    let activeRequest = true;

    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const friends = await friendsSearch(searchTerm, page);
        
        if (!activeRequest) return;

        console.log("Search Results:", friends);

        // If api returns empty or less than expected page size (e.g., 10), no more data
        if (!friends || friends.length === 0) {
          setHasMore(false);
          return;
        }

        setSearchResults((prev) => {
          const newResults = page === 1 ? friends : [...prev, ...friends];
          return newResults.filter(
            (item, index, self) => self.findIndex((t) => t.id === item.id) === index
          );
        });
      } catch (err) {
        if (!activeRequest) return;
        toast.error(t("search_error"));
        setSearchResults(DUMMY_RESULTS);
      } finally {
        if (activeRequest) setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      activeRequest = false;
      clearTimeout(delayDebounce);
    };
  }, [page, searchTerm, t]);

  // Correctly attached Infinite Scroll Listener
  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (
        scrollHeight - scrollTop <= clientHeight + 30 &&
        !isLoading &&
        hasMore && 
        searchTerm.trim()
      ) {
        setPage((prev) => prev + 1);
      }
    }
  };

  return (
    <Header>
      <div className="flex justify-start items-center gap-4">
        <div className="flex justify-start items-center gap-4">
          <div className="p-4 rounded-full bg-[#161A41]/40 flex-center ">
            <PiChatCircleTextBold className="text-white w-6 h-6" />
          </div>
          <h2 className="text-white mb-0">{t("chats.title")}</h2>
        </div>
      </div>

      <div className="relative mb-4" ref={dropdownRef}>
        <IoSearch
          className={`absolute ${i18n.dir() === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-400 w-5 h-5 z-10`}
        />
        <Input
          type="text"
          onFocus={() => setOpenSearchDropdown(true)}
          value={searchTerm}
          placeholder={t("chats.searchPlaceholder")}
          className={`w-full ${i18n.dir() === "rtl" ? "pr-12" : "pl-12"} ps-4 py-3 border-2 rounded-lg outline-none transition-all focus:border-[#6976EB] bg-white/10 border-white/20 dark:border-white/10 dark:placeholder:text-gray-400 placeholder:text-gray-300 text-white`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <AnimatePresence>
          {openSearchDropdown && (
            <motion.ul
              ref={scrollRef} // Move ref here!
              onScroll={onScroll} // Move onScroll event listener here!
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full h-64 overflow-y-auto no-scrollbar bg-white dark:bg-[#1e224f] border-2 border-[#6976EB] rounded-lg mt-1 text-sm text-[#161A41] dark:text-white shadow-xl z-[60] p-4"
            >
              {searchResults.length > 0 ? (
                searchResults.map((user, idx) => (
                  <div
                    onClick={() => {
                      setOpenSearchDropdown(false);
                      navigate(`/chats/${user.id}`);
                    }}
                    key={`${user.id}-${idx}`}
                    className="group flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div
                      className={`w-11 h-11 border-2 rounded-full overflow-hidden shrink-0 shadow-sm ${
                        getBorderColor(user?.diabetes_type?.toLowerCase()) || "border-[#6976EB]"
                      }`}
                    >
                      <img
                        src={user?.profile_picture || user?.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="m-0 text-[#161A41] dark:text-white font-bold text-sm">
                        {user?.first_name} {user?.last_name}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold m-0">
                        {user?.diabetes_type || "Member"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                !isLoading && (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    ابدأ بالبحث عن أصدقاء جدد لمحادثتهم!
                  </div>
                )
              )}
              {isLoading && (
                <div className="text-center py-2 text-xs text-gray-400">جاري التحميل...</div>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Header>
  );
}