import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { RiSendPlaneFill } from "react-icons/ri";
import { CgSpinner } from "react-icons/cg";

import Button from "../ui/Button";
import LineChartComponent from "../ui/LineChartComponent";
import Input from "../ui/Input";

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

export default function Chart() {
  const { t } = useTranslation();
  
  // 1. Keep the raw state in YYYY-MM-DD format for the Input
  const [glucoseReadings, setGlucoseReadings] = useState(readingsData);
  const [dateValue, setDateValue] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dateValue) return;
    
    setIsLoading(true);
    
    // Simulate an API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dateValue]);

  // 2. Format function for the DISPLAY text
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = t(`profilePage.personalInfo.months.${d.getMonth()}`);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <section className="w-full h-fit shadow-lg gap-8 border p-4 md:p-6 rounded-2xl bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10">
      <div className="flex flex-col gap-4 justify-start items-start md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3>{t("homePage.chart.title")}</h3>
          {/* Display the pretty translated date */}
          <p className="card-text">{formatDisplayDate(dateValue)}</p>
        </div>
        
        <div className="flex flex-row-reverse md:flex-row justify-center items-center gap-4">
            {isLoading && (
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <CgSpinner className="text-[#6976EB] w-8 h-8" />
                </motion.div>
            )}
          <Input 
            placeholder={t("homePage.chart.searchPlaceholder")}
            value={dateValue} 
            onChange={(e) => setDateValue(e.target.value)}
            type="date"
            className="max-w-[200px]"
          />
        </div>
      </div>

      <div className="h-[300px] w-full">
        <LineChartComponent glucoseReadings={readingsData} />
      </div>
    </section>
  );
}