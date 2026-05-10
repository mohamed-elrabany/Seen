import HeaderBar from "../../components/community/HeaderBar";
import CategorySidebar from "../../components/community/CategorySidebar";
import PostFeed from "../../components/community/PostsFeed";

import { useState } from "react";

export default function Community() {
  const [category, setCategory] = useState("General");

  return (
    <div className="space-y-8">
      <HeaderBar />
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 items-start">
        <CategorySidebar
          checkedCategory={category}
          setCheckedCategory={setCategory}
        />
        <div className="lg:col-span-2">
          <PostFeed category={category} />
        </div>
      </div>
    </div>
  );
}
