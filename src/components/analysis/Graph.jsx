import Button from "../ui/Button";
import AnalysisChart from "./AnalysisChart";

import { useState } from "react";

const BUTTONS_CONFIG = [
  { id: "All", label: "الكل" },
  { id: "Fasting", label: "صائم" },
  { id: "Before Meal", label: "قبل الأكل" },
  { id: "After Meal", label: "بعد الأكل" },
  { id: "Random", label: "عشوائي" },
];

export default function Graph({ readings }) {
  const [activeType, setActiveType] = useState("All");

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex justify-center items-center gap-2 md:gap-4">
        {BUTTONS_CONFIG.map((btn) => {
          const isSelected = activeType === btn.id;
          return (
            <Button
              key={btn.id}
              onClick={() => setActiveType(btn.id)}
              className={`
                w-full cursor-pointer p-4 rounded-md transition-colors duration-300 border border-transparent
                ${isSelected ? "bg-[#6976EB] text-white" : "text-[#6976EB] hover:bg-[#6976EB]/10"}
              `}
            >
              {btn.label}
            </Button>
          );
        })}
      </div>

      {/* Pass activeType to the child Component so it can show/hide line filters */}
      <div className="h-[500px] w-full relative px-2 py-4
      bg-white rounded-2xl shadow-lg border border-[#D9D9D9]/30 dark:bg-white/10 dark:border-white/10
      ">
        <AnalysisChart analysisData={readings} activeType={activeType} />
      </div>
    </div>
  );
}