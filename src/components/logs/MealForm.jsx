import Input from "../ui/Input";
import RadioButton from "../ui/RadioButton";
import { motion } from "framer-motion";
import { useState, useId } from "react";
import { useTranslation } from "react-i18next";

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

export default function MealForm({ mealData, setMealData }) {
  const id = useId(); // Generates a unique ID for the label/input association
  const { t } = useTranslation();

  function handleRadioClick(value) {
    setMealData((prevData) => {
      const currentType = prevData?.record_meal?.meal_type;
      return {
        ...prevData,
        record_meal: {
          ...prevData.record_meal,
          meal_type: currentType === value ? "" : value
        }
      };
    });
  }

  const mealTypes = [
    { value: "Breakfast", label: t("logs.add-edit-log.record_meal.meal.types.breakfast") },
    { value: "Lunch", label: t("logs.add-edit-log.record_meal.meal.types.lunch") },
    { value: "Dinner", label: t("logs.add-edit-log.record_meal.meal.types.dinner") },
    { value: "Snack", label: t("logs.add-edit-log.record_meal.meal.types.snack") },
  ];

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
          {t("logs.add-edit-log.record_meal.meal.title")}
        </label>
        
        <div className="w-full md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mealTypes.map((type) => (
            <motion.div key={type.value} variants={itemVariants}>
              <RadioButton
                name="meal_type"
                value={type.value}
                isChecked={mealData?.meal_type === type.value}
                onClick={() => handleRadioClick(type.value)}
              >
                {type.label}
              </RadioButton>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.record_meal.description.title")}
          name="meal_description"
          type="text"
          placeholder={t("logs.add-edit-log.record_meal.description.placeholder")}
          value={mealData?.meal_description || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.record_meal.carbs.title")}
          name="total_carb"
          type="number"
          placeholder={t("logs.add-edit-log.record_meal.carbs.placeholder")}
          value={mealData?.total_carb || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.record_meal.calories.title")}
          name="total_calories"
          type="number"
          placeholder={t("logs.add-edit-log.record_meal.calories.placeholder")}
          value={mealData?.total_calories || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <div className="flex-col-start gap-3">
          <label
            htmlFor="meal-notes"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            {t("logs.add-edit-log.record_meal.notes.title")}
          </label>

          <textarea
            onChange={(e)=> handleInputChange(e)}
            name="notes"
            id="meal-notes"
            placeholder={t("logs.add-edit-log.record_meal.notes.placeholder")}
            className="w-full bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
          >
            {mealData?.notes || ""}
          </textarea>
        </div>
      </motion.div>

    </motion.div>
  );
}