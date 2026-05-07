import { motion } from "framer-motion";
import GlucoseIcon from "../../ui/GlucoseIcon";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function GlucoseDetails({ glucoseRecordData }) {
  // Convert object to label/value array
  const glucoseDataArray = [
    { label: "Glucose Level", value: `${glucoseRecordData.glucose_level} mg/dL` },
    { label: "Reading Type", value: glucoseRecordData.reading_type },
    { label: "A1C Estimation", value: glucoseRecordData.a1c_estimation || "N/A" },
    { label: "Notes", value: glucoseRecordData.notes || "No notes provided" },
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

  const glucoseStatus = getGlucoseStatus(glucoseRecordData?.glucose_level);                  
  const glucoseTagClasses = glucoseRecordData?.glucose_level ? glucoseReadingTag[glucoseStatus] : "";

  return (
    <motion.div 
      variants={itemVariants} 
      className="overflow-hidden rounded-2xl border-2 border-[#6976EB] bg-white shadow-lg dark:bg-[#1e224f]"
    >
      {/* Static Purple Header */}
      <div className="flex items-center gap-4 bg-[#6976EB] px-6 py-6 text-white">
        <div className="rounded-lg bg-white p-2 text-[#6976EB]">
          <GlucoseIcon className="h-6 w-6" />
        </div>
        <p className="text-2xl font-bold">Glucose Record</p>
      </div>

      {/* Details List (Always Visible) */}
      <ul className="w-full text-[#161A41] dark:text-white">
        {glucoseDataArray.map((item, index) => (
          <li
            key={index}
            className={`border-b border-[#D9D9D9]/30 px-6 py-4 last:border-b-0 ${item.label === "Glucose Level" ? glucoseTagClasses : ""}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <p className="text-lg font-medium">{item.value}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}