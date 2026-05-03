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

export default function LineChartComponent({ glucoseReadings }) {
  const darkMode = useSelector((state) => state.theme.theme);
  const isDark = darkMode === "dark";
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // Arabic

  const formatChartTime = (timeStr, lng) => {
    // 1. Create a dummy date (today + the time from backend)
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));

    // 2. Use the same logic we used for cards
    return date.toLocaleTimeString(lng, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      numberingSystem: "latn", // Keeps digits as 1, 2, 3
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* Increased left margin slightly to make room for the Y-Axis label */}
      <LineChart
        data={glucoseReadings}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={!isDark ? "#808080" : "#D9D9D9"}
          opacity={0.2}
        />

        <XAxis
          tickFormatter={(time) => formatChartTime(time, i18n.language)}
          dataKey="time"
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
          content={<CustomTooltip />}
          cursor={{ stroke: "#6976EB", strokeWidth: 1 }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#6976EB"
          strokeWidth={3}
          dot={{ r: 4, fill: "#6976EB" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1F1A5F] border border-[#D9D9D9]/30 dark:border-white/10 p-3 rounded-xl shadow-xl">
        {/* Time Row */}
        <p className="text-sm font-medium text-gray-400 mb-1">
          {t("homePage.chart.tooltip.date", { date: label })}
        </p>

        {/* Glucose Value Row */}
        <p className="text-sm font-bold text-[#6976EB]">
          {t("homePage.chart.tooltip.glucose", { value: payload[0].value })}
          <span className={`text-xs ${isRTL ? "mr-1" : "ml-1"}`}>
            {t("mg/dL")}
          </span>
        </p>
      </div>
    );
  }
  return null;
};
