import { t } from "i18next";
import Input from "../ui/Input";
import RadioButton from "../ui/RadioButton";
import { motion } from "framer-motion";
import { useState, useId } from "react";
import { getGlucoseStatusStyles } from "../../util/logs/glucoseStatus";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function GlucoseForm({ glucoseData, setGlucoseData }) {
  const id = useId(); // Generates a unique ID for the label/input association

  function handleInputChange(e) {
    const { name, value } = e.target;
    setGlucoseData((prevData) => ({
      ...prevData,
      record_glucose:{
        ...prevData.record_glucose,
        [name]: value
      }
    }));
  }

  function handleRadioClick(value) {
    setGlucoseData((prevData) => {
      const currentType = prevData?.record_glucose?.reading_type;
      return {
        ...prevData,
        record_glucose: {
          ...prevData.record_glucose,
          reading_type: currentType === value ? "" : value
        }
      };
    });
  }

  const glucoseTypes = [
    { value: "Random", label: t("logs.add-edit-log.record_glucose.measurement.types.random") },
    { value: "Fasting", label: t("logs.add-edit-log.record_glucose.measurement.types.fasting") },
    { value: "Before Meal", label: t("logs.add-edit-log.record_glucose.measurement.types.preMeal") },
    { value: "After Meal", label: t("logs.add-edit-log.record_glucose.measurement.types.postMeal") },
  ];

  const glucoseTagClasses = getGlucoseStatusStyles(glucoseData?.glucose_level, true);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 items-start">
        <label
          className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base"
          htmlFor={id}
        >
          {t("logs.add-edit-log.record_glucose.measurement.title")}
        </label>
        
        <div className="w-full md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {glucoseTypes.map((type) => (
            <motion.div key={type.value} variants={itemVariants}>
              <RadioButton
                name="reading_type"
                value={type.value}
                onClick={() => handleRadioClick(type.value)}
                isChecked={glucoseData?.reading_type === type.value}
              >
                {type.label}
              </RadioButton>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.record_glucose.glucose-level.title")}
          name="glucose_level"
          type="number"
          placeholder={t("logs.add-edit-log.record_glucose.glucose-level.placeholder")}
          value={glucoseData?.glucose_level || ""}
          onChange={(e) => handleInputChange(e)}
          className={glucoseTagClasses}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.record_glucose.a1c.title")}
          name="a1c_estimation"
          type="number"
          placeholder={t("logs.add-edit-log.record_glucose.a1c.placeholder")}
          value={glucoseData?.a1c_estimation || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <div className="flex-col-start gap-3">
          <label
            htmlFor="glucose-notes"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            {t("logs.add-edit-log.record_glucose.notes.title")}
          </label>

          <textarea
            onChange={(e)=> handleInputChange(e)}
            name="notes"
            id="glucose-notes"
            placeholder={t("logs.add-edit-log.record_glucose.notes.placeholder")}
            className="w-full bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
            value={glucoseData?.notes || ""}
          />
        </div>
      </motion.div>

    </motion.div>
  );
}