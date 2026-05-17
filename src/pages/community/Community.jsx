import HeaderBar from "../../components/community/HeaderBar";
import CategorySidebar from "../../components/community/CategorySidebar";
import PostFeed from "../../components/community/PostsFeed";

import { useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";

// Community.jsx
export default function Community() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "General";

  useEffect(() => {
    if (!searchParams.has("category")) {
      setSearchParams({ category: "General" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
  }


  return (
    <div className="space-y-8">
      <HeaderBar />
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 items-start">
        <CategorySidebar
          checkedCategory={activeCategory}
          setCheckedCategory={handleCategoryChange}
        />
        <div className="lg:col-span-2">
          <PostFeed category={activeCategory} />
        </div>
      </div>
    </div>
  );
}