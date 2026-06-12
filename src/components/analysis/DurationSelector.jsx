import Button from "../ui/Button";
import Input from "../ui/Input";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const BUTTONS_CONFIG = [
  { id: "weekly", label: "analysis.weekly" },
  { id: "monthly", label: "analysis.monthly" },
  { id: "custom", label: "analysis.custom" },
];

export default function DurationSelector({
  duration,
  setDuration,
  range,
  setRange,
}) {
  const { t } = useTranslation();
  return (
    <div className="w-full space-y-4">
      <div className="w-full grid grid-cols-3 justify-center items-center gap-4">
        {BUTTONS_CONFIG.map((btn) => {
          // Boolean that activates the selection when condition is met
          const isSelected = duration === btn.id;

          return (
            <Button
              key={btn.id}
              onClick={() => setDuration(btn.id)}
              className={`
                                w-full cursor-pointer p-4 rounded-md transition-colors duration-300 border border-transparent
                                ${
                                  isSelected
                                    ? "bg-[#6976EB] text-white"
                                    : "bg-[#6976EB]/10 text-[#6976EB] border-[#6976EB]/10 dark:bg-white/10 dark:text-white dark:border-white/10"
                                }
                            `}
            >
              {t(btn.label)}
            </Button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {duration === "custom" && (
          <motion.div
            key="custom-range"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full py-4 grid grid-cols-2 gap-4 items-center justify-center"
          >
            <Input
              label={t("analysis.from")}
              type="date"
              value={range.start || ""}
              max={range.end || undefined} // string "YYYY-MM-DD", not new Date()
              onChange={(e) => setRange({ ...range, start: e.target.value })}
            />
            <Input
              label={t("analysis.to")}
              type="date"
              value={range.end || ""}
              min={range.start || undefined} // prevents end < start
              onChange={(e) => setRange({ ...range, end: e.target.value })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
