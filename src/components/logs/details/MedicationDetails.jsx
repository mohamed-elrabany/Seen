import { motion } from "framer-motion";
import { BiSolidInjection } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function MedicationDetails({ medicationRecordData }) {
  const { t } = useTranslation();
  // Assuming medicationRecordData.selected_medication_ids is an array like ["Oxycodone", "Ibuprofen"]
  const meds = medicationRecordData?.medications || [];

  return (
    <motion.div  
      variants={itemVariants}
      className="overflow-hidden rounded-2xl border-2 border-[#6976EB] bg-white shadow-lg dark:bg-[#1e224f]"
    >
      {/* Static Purple Header */}             
      <div className="flex items-center gap-4 bg-[#6976EB] px-6 py-6 text-white">
        <div className="rounded-lg bg-white p-2 text-[#6976EB]">
          <BiSolidInjection className="h-6 w-6" />  
        </div>
        <p className="text-2xl font-bold">{t("logs.details.medication.title")}</p>
      </div>

      {/* Details List */} 
      <ul className="w-full text-[#161A41] dark:text-white">
        {/* Medications List Section */}
        <li className="border-b border-[#D9D9D9]/30 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#808080] dark:text-gray-400">
            {t("logs.details.medication.medications")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {meds.length > 0 ? (
              meds.map((med, index) => (
                <span 
                  key={index} 
                  className="rounded-full bg-[#6976EB]/10 px-4 py-1 text-sm font-medium text-[#6976EB] dark:bg-[#6976EB]/20 dark:text-white"
                >
                  {med}
                </span>
              ))
            ) : (
              <p className="text-lg font-medium italic text-gray-400">None recorded</p>
            )}
          </div>
        </li>

        {/* Notes Section */}
        <li className="px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#808080] dark:text-gray-400">
            {t("logs.details.notes")}
          </p>
          <p className="text-lg font-medium">
            {medicationRecordData.notes || t("logs.details.empty")}
          </p>
        </li>
      </ul>
    </motion.div>
  );
}