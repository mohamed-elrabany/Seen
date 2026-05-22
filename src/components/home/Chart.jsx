import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getGlucoseReadings } from "../../services/logServices";
import { formatDisplayedDate } from "../../util/formatDiplayedDate";

import { CgSpinner } from "react-icons/cg"; 

import toast from "react-hot-toast";
import LineChartComponent from "../ui/LineChartComponent";
import Input from "../ui/Input";

// Initial mock data
const readingsData = [
  { time: "08:00", value: 95 },
  { time: "10:00", value: 120 },
  { time: "12:00", value: 145 },
  { time: "14:00", value: 110 },
  { time: "16:00", value: 105 },
  { time: "18:00", value: 130 },
  { time: "20:00", value: 115 },
  { time: "22:00", value: 98 },
];

// Fallback state for invalid/empty dates
const emptyStateWithLabels = [
  { time: "08:00", value: null },
  { time: "10:00", value: null },
  { time: "12:00", value: null },
  { time: "14:00", value: null },
  { time: "16:00", value: null },
  { time: "18:00", value: null },
  { time: "20:00", value: null },
  { time: "22:00", value: null },
];

// Helper function to get correct YYYY-MM-DD in the user's local timezone
const getLocalYYYYMMDD = (dateInput = new Date()) => {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Chart({ setDate }) {
  const { t } = useTranslation();
  
  // 1. inputValue: Initialized to local date instead of UTC
  const [inputValue, setInputValue] = useState(getLocalYYYYMMDD());
  
  // 2. dateValue: Only updates when inputValue is valid (Source of Truth for UI)
  const [dateValue, setDateValue] = useState(inputValue);
  
  const [glucoseReadings, setGlucoseReadings] = useState(emptyStateWithLabels);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) return;

    // DEBOUNCE: Wait 1 second after last keystroke before validating/fetching
    const handler = setTimeout(() => {
      const selectedDate = new Date(inputValue);
      const selectedYear = selectedDate.getFullYear();
      const currentYear = new Date().getFullYear();

      // LOGICAL VALIDATION
      if (selectedYear >= 2026 && selectedYear <= currentYear) {
        setDateValue(inputValue); // Update the visual "Source of Truth"
        setDate(inputValue); // Update the parent component's date state
        setIsLoading(true);
        
        const fetchGlucoseReadings = async () => {
          try {
            const readings = await getGlucoseReadings(inputValue); // Pass current inputValue directly
            console.log("Fetched readings:", readings);
            setGlucoseReadings(readings && readings.length > 0 ? readings : emptyStateWithLabels);
          } catch (error) {
            console.error("Fetch error:", error);
            toast.error(t("toasts.home.fetchError"));
          } finally {
            setIsLoading(false);
          }
        };

        fetchGlucoseReadings();
      } else {
        // If the date is format-valid but logically invalid
        setInputValue(dateValue); // Revert to last valid date in input field
        toast.error(t("toasts.home.dateError"));
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [inputValue, t, dateValue, setDate]);

  return (
    <section className="w-full h-fit shadow-lg gap-8 border p-4 md:p-6 rounded-2xl bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10">
      <div className="flex flex-col gap-4 justify-start items-start md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3>
            {t("homePage.chart.title")}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDisplayedDate(dateValue)}
          </p>
        </div>
        
        <div className="flex flex-row-reverse md:flex-row justify-center items-center gap-4">
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <CgSpinner className="text-[#6976EB] w-8 h-8" />
            </motion.div>
          )}
          
          <Input 
            type="date"
            min="2026-01-01" 
            max={getLocalYYYYMMDD()} // Bound max to local calendar date
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
      </div>

      <div className="h-[300px] w-full relative">
        <LineChartComponent glucoseReadings={glucoseReadings} />            
      </div>
    </section>
  );
}