import Input from "../ui/Input";
import RadioButton from "../ui/RadioButton";
import { motion } from "framer-motion";
import { useState, useId } from "react";

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
        recordGlucose:{
          ...prevData.recordGlucose,
          [name]: value
        }
      }));
    }

  const glucoseTypes = [
    { value: "random", label: "Random" },
    { value: "fasting", label: "Fasting" },
    { value: "beforeMeal", label: "Before Meal" },
    { value: "afterMeal", label: "After Meal" },
  ];

    const getGlucoseStatus = (value) => {
    if (value === null || value === undefined || value === "") return "empty";
    const num = Number(value);
    if (num>=70 &&num <= 140) return "normal";
    return "danger";
  };

const glucoseReadingTag = {
  normal: "text-[#17CE92] dark:text-[#17CE92] bg-[#17CE92]/10 border-[#17CE92] focus:border-[#17CE92] font-semibold",
  danger: "text-[#FB2C36] dark:text-[#FB2C36] bg-[#FB2C36]/10 border-[#FB2C36] focus:border-[#FB2C36] font-semibold",
};

  const glucoseStatus = getGlucoseStatus(glucoseData?.glucose_level);                  
  const glucoseTagClasses = glucoseData?.glucose_level ? glucoseReadingTag[glucoseStatus] : "";

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
          Measurement Type
        </label>
        
        <div className="w-full md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {glucoseTypes.map((type) => (
            <motion.div key={type.value} variants={itemVariants}>
              <RadioButton
                name="reading_type"
                value={type.value}
                isChecked={glucoseData?.reading_type === type.value}
                onChange={(e) => handleInputChange(e)}
              >
                {type.label}
              </RadioButton>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <Input
          label="Glucose Reading (mg/dL)"
          name="glucose_level"
          type="number"
          placeholder="Enter glucose reading"
          value={glucoseData?.glucose_level || ""}
          onChange={(e) => handleInputChange(e)}
          className={glucoseTagClasses}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label="A1C Estimation"
          name="a1c_estimation"
          type="number"
          placeholder="Enter A1C estimation"
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
            Notes
          </label>

          <textarea
            onChange={(e)=> handleInputChange(e)}
            name="notes"
            id="glucose-notes"
            placeholder={"Add any additional notes about this glucose measurement..."}
            className="w-full bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
          >{glucoseData?.notes || ""}</textarea>
        </div>
      </motion.div>

    </motion.div>
  );
}