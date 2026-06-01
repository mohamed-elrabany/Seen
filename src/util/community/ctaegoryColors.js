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

export function profileTagStyling(type) {
  const profileTagStylingMap = {
    type1: "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444] capitalize",
    type2: "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6] capitalize",
    lada: "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e] uppercase",
    mody: "bg-[#f97316]/20 text-[#f97316] border-[#f97316] uppercase",
    gestational: "bg-[#a855f7]/20 text-[#a855f7] border-[#a855f7] capitalize",
  };

  return profileTagStylingMap[type] || "bg-gray-300";
}

export function postTagStyling(type) {
  const postTagStylingMap = {
    "type1 / lada": "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444] capitalize items-stretch min-w-0",
    type2: "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6] capitalize",
    mody: "bg-[#f97316]/20 text-[#f97316] border-[#f97316] uppercase",
    gestational: "bg-[#a855f7]/20 text-[#a855f7] border-[#a855f7] capitalize",
    general: "bg-[#eab308]/20 text-[#eab308] border-[#eab308] capitalize",
    advices: "bg-[#9ca3af]/20 text-[#9ca3af] border-[#9ca3af] capitalize",
  };

  return postTagStylingMap[type] || "bg-gray-300";
}
