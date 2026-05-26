import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AnalysisChart({ analysisData, activeType }) {
  const darkMode = useSelector((state) => state.theme.theme);
  const isDark = darkMode === "dark";
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // --- DATE SYNCHRONIZATION PARSER ---
  const fastingData = analysisData?.fasting || [];
  const preMealData = analysisData?.pre_meal || [];
  const postMealData = analysisData?.post_meal || []; // Fixed key name
  const randomData = analysisData?.random || [];

  // 1. Gather every unique date from all arrays to establish chart timeline coordinates
  const allTimestamps = [
    ...fastingData.map(d => d.timestamp),
    ...preMealData.map(d => d.timestamp),
    ...postMealData.map(d => d.timestamp),
    ...randomData.map(d => d.timestamp),
  ];

  const uniqueDates = Array.from(
    new Set(allTimestamps.map(ts => ts.split("T")[0]))
  ).sort();

  // 2. Map date buckets into sequential slots (1, 2, 3...) to match screenshot style
  const formattedChartData = uniqueDates.map((dateStr, i) => {
    const fObj = fastingData.find(d => d.timestamp.startsWith(dateStr));
    const prObj = preMealData.find(d => d.timestamp.startsWith(dateStr));
    const pmObj = postMealData.find(d => d.timestamp.startsWith(dateStr));
    const rObj = randomData.find(d => d.timestamp.startsWith(dateStr));

    return {
      label: (i + 1).toString(), // Displays 1, 2, 3... on X-axis
      date: dateStr,
      fasting: fObj?.glucoseLevel || null,
      pre_meal: prObj?.glucoseLevel || null,
      post_meal: pmObj?.glucoseLevel || null,
      random: rObj?.glucoseLevel || null,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedChartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={!isDark ? "#808080" : "#D9D9D9"}
          opacity={0.2}
        />

        <XAxis
          dataKey="label"
          stroke={!isDark ? "#808080" : "#D9D9D9"}
          dy={5}
          tick={{ fill: !isDark ? "#808080" : "#D9D9D9", fontSize: 12 }}
        />

        <YAxis
          dx={isRTL ? -25 : -5}
          stroke={!isDark ? "#808080" : "#D9D9D9"}
          tick={{ fill: !isDark ? "#808080" : "#D9D9D9", fontSize: 12 }}
        />

        <Tooltip
          content={<CustomTooltip activeType={activeType} />}
          cursor={{ stroke: "#6976EB", strokeWidth: 1 }}
        />

        {(activeType === "All" || activeType === "Fasting") && (
          <Line
            type="monotone"
            dataKey="fasting"
            stroke="#17CE92"
            strokeWidth={3}
            connectNulls // Allows lines to cross missing days cleanly
            dot={{ r: 4, fill: "#17CE92" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        )}

        {(activeType === "All" || activeType === "Before Meal") && (
          <Line
            type="monotone"
            dataKey="pre_meal"
            stroke="#FB2C36"
            strokeWidth={3}
            connectNulls
            dot={{ r: 4, fill: "#FB2C36" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        )}

        {(activeType === "All" || activeType === "After Meal") && (
          <Line
            type="monotone"
            dataKey="post_meal"
            stroke="#6976EB"
            strokeWidth={3}
            connectNulls
            dot={{ r: 4, fill: "#6976EB" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        )}

        {(activeType === "All" || activeType === "Random") && (
          <Line
            type="monotone"
            dataKey="random"
            stroke="#FF9800"
            strokeWidth={3}
            connectNulls
            dot={{ r: 4, fill: "#FF9800" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, activeType }) => {
  const { t } = useTranslation();
  const isRTL = true; // Hardcoded or pulled from i18n instance context

  if (active && payload && payload.length) {
    // Pick the actively focused payload coordinate
    let keyMapping = "post_meal";
    if (activeType === "Fasting") keyMapping = "fasting";
    if (activeType === "Before Meal") keyMapping = "pre_meal";
    if (activeType === "Random") keyMapping = "random";

    const activePayloadItem = payload.find(p => p.name === keyMapping) || payload[0];

    // Map internal key strings back to clean category tags
    const typeLabels = {
      fasting: "صائم",
      pre_meal: "قبل الأكل",
      post_meal: "بعد الأكل",
      random: "عشوائي",
    };
    const currentTypeName = typeLabels[activePayloadItem.name] || "";

    return (
      <div className="bg-white dark:bg-[#1F1A5F] border border-[#D9D9D9]/30 dark:border-white/10 p-3 rounded-xl shadow-xl z-50 text-right">
        {/* Shows Reading Type Label instead of Time Stamp */}
        <p className="text-sm font-medium text-gray-400 mb-1">
          {currentTypeName}
        </p>

        <p className="text-sm font-bold" style={{ color: activePayloadItem.color }}>
          {activePayloadItem.value}
          <span className={`text-xs ${isRTL ? "mr-1" : "ml-1"} text-gray-500 dark:text-gray-300`}>
            {" "}{t("mg/dL")}
          </span>
        </p>
      </div>
    );
  }
  return null;
};