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

export default function AnalysisChart({ graphData, activeType }) {
  const darkMode = useSelector((state) => state.theme.theme);
  const isDark = darkMode === "dark";
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // --- DATE SYNCHRONIZATION PARSER ---
  // --- DATE SYNCHRONIZATION PARSER ---
  const allData = graphData?.all || [];
  const fastingData = graphData?.fasting || [];
  const preMealData = graphData?.pre_meal || [];
  const postMealData = graphData?.post_meal || []; 
  const randomData = graphData?.random || [];

  // 1. Gather every single unique timestamp across all categories
  const allTimestamps = [
    ...allData.map(d => d.loggedAt),
    ...fastingData.map(d => d.loggedAt),
    ...preMealData.map(d => d.loggedAt),
    ...postMealData.map(d => d.loggedAt),
    ...randomData.map(d => d.loggedAt),
  ];

  // 2. Keep the full timestamp string so identical days with different times don't overwrite each other
  const uniqueTimestamps = Array.from(
    new Set(allTimestamps.filter(Boolean))
  ).sort((a, b) => new Date(a) - new Date(b)); // Sorts chronologically

  // 3. Map every unique timestamp to its own point on the chart
  const formattedChartData = uniqueTimestamps.map((timestampStr, i) => {
    // Match by the exact full timestamp string instead of just the date prefix
    const aObj = allData.find(d => d.loggedAt === timestampStr);
    const fObj = fastingData.find(d => d.loggedAt === timestampStr);
    const prObj = preMealData.find(d => d.loggedAt === timestampStr);
    const pmObj = postMealData.find(d => d.loggedAt === timestampStr);
    const rObj = randomData.find(d => d.loggedAt === timestampStr);

    return {
      label: (i + 1).toString(), // Keeps your 1, 2, 3... sequential X-axis look
      date: timestampStr.split(" ")[0], // Can still pass the raw date or time to tooltips if needed
      all: aObj?.glucoseValue || null,
      fasting: fObj?.glucoseValue || null,
      pre_meal: prObj?.glucoseValue || null,
      post_meal: pmObj?.glucoseValue || null,
      random: rObj?.glucoseValue || null,
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

        {(activeType === "All") && (
          <Line
            type="monotone"
            dataKey="all"
            stroke="#6976EB"
            strokeWidth={3}
            connectNulls // Allows lines to cross missing days cleanly
            dot={{ r: 4, fill: "#6976EB" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        )}

        {(activeType === "Categorized" || activeType === "Fasting") && (
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

        {(activeType === "Categorized" || activeType === "Before Meal") && (
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

        {(activeType === "Categorized" || activeType === "After Meal") && (
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

        {(activeType === "Categorized" || activeType === "Random") && (
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
      fasting: "analysis.types.fasting",
      pre_meal: "analysis.types.preMeal",
      post_meal: "analysis.types.postMeal",
      random: "analysis.types.random",
    };
    const currentTypeName = typeLabels[activePayloadItem.name] || "";

    return (
      <div className="bg-white dark:bg-[#1F1A5F] border border-[#D9D9D9]/30 dark:border-white/10 p-3 rounded-xl shadow-xl z-50 text-right">
        {/* Shows Reading Type Label instead of Time Stamp */}
        <p className="text-sm font-medium text-gray-400 mb-1">
          {t(currentTypeName)}
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