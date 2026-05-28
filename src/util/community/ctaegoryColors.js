export function getBorderColor(category) {
  const profileBorderColorMap = {
    type1: "border-[#ef4444]",
    type2: "border-[#3b82f6]",
    mody: "border-[#f97316]",
    lada: "border-[#22c55e]",
    gestational: "border-[#a855f7]",
  };

  return profileBorderColorMap[category] || "border-gray-300";
}

export function getTagStyling(category) {
  const profileTagStylingMap = {
    type1: "bg-[#ef4444]",
    type2: "bg-[#3b82f6]",
    mody: "bg-[#f97316]",
    gestational: "bg-[#a855f7]",
  };

  return profileTagStylingMap[category] || "bg-gray-300";
}
