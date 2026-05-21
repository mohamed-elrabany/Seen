import { motion } from "framer-motion";
import { BsForkKnife } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function MealDetails({ mealRecordData }) {
  const { t } = useTranslation();

  // 1. Definition of your lookup mapping array
  const mealTypes = [
    { value: "Breakfast", label: t("logs.add-edit-log.record_meal.meal.types.breakfast") },
    { value: "Lunch", label: t("logs.add-edit-log.record_meal.meal.types.lunch") },
    { value: "Dinner", label: t("logs.add-edit-log.record_meal.meal.types.dinner") },
    { value: "Snack", label: t("logs.add-edit-log.record_meal.meal.types.snack") },
  ];

  // 2. Find matching translated label based on backend meal_type
  const matchedType = mealTypes.find(type => type.value === mealRecordData.meal_type);
  const localizedMealType = matchedType ? matchedType.label : (mealRecordData.meal_type || t("logs.details.empty"));

  const mealDataArray = [
    { label: t("logs.details.meal.type"), value: localizedMealType }, // Uses the localized string
    {
      label: t("logs.details.meal.description"),
      value: mealRecordData.meal_description || t("logs.details.empty"),
    },
    {
      label: t("logs.details.meal.carbs"),
      value:
        mealRecordData?.total_carb !== undefined &&
        mealRecordData?.total_carb !== null
          ? t("logs.details.meal.carb-amount", {
              value: mealRecordData.total_carb,
            })
          : t("logs.details.empty"),
    },
    {
      label: t("logs.details.meal.cal"),
      value:
        mealRecordData?.total_calories !== undefined &&
        mealRecordData?.total_calories !== null
          ? t("logs.details.meal.cal-amount", {
              value: mealRecordData.total_calories,
            })
          : t("logs.details.empty"),
    },
    {
      label: t("logs.details.notes"),
      value: mealRecordData.notes || t("logs.details.empty"),
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-2xl border-2 border-[#6976EB] bg-white shadow-lg dark:bg-[#1e224f]"
    >
      {/* Static Purple Header */}
      <div className="flex items-center gap-4 bg-[#6976EB] px-6 py-6 text-white">
        <div className="rounded-lg bg-white p-2 text-[#6976EB]">
          <BsForkKnife className="h-6 w-6" />
        </div>
        <p className="text-2xl font-bold">{t("logs.details.meal.title")}</p>
      </div>

      {/* Details List (Always Visible) */}
      <ul className="w-full text-[#161A41] dark:text-white">
        {mealDataArray.map((item, index) => (
          <li
            key={index}
            className={`border-b border-[#D9D9D9]/30 px-6 py-4 last:border-b-0`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#808080] dark:text-gray-400">
              {item.label}
            </p>
            <p className="text-lg font-medium">{item.value}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}