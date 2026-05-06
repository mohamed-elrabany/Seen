//Assets & UI
import Input from "../ui/Input";
import RadioButton from "../ui/RadioButton";
import { RiAddLargeLine } from "react-icons/ri";
import { FaAngleDown, FaCircleCheck, FaXmark } from "react-icons/fa6";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getMedications } from "../../services/medicationServices";
import toast from "react-hot-toast";

const medicationNames = [
  "Insulin Glargine (Lantus)",
  "Metformin",
  "Semaglutide (Ozempic)",
  "Empagliflozin (Jardiance)",
];

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

export default function MedicationForm({
  medicationData, // This is your 'logData' object
  setMedicationData, // This is your 'setLogData' function
  setIsModalOpen,
}) {
  const [openMedicationDropdown, setOpenMedicationDropdown] = useState(false);
  const [medicationList, setMedicationList] = useState([]);

useEffect(() => {
  const fetchMedications = async () => {
    try {
      const data = await getMedications();
      
      // If it's an array, use it. If it's an object, convert it. 
      // If it's null/undefined, use medicationNames.
      const formattedList = Array.isArray(data) 
        ? data 
        : (data ? Object.values(data) : medicationNames);
        
      setMedicationList(formattedList);
    } catch (error) {
      toast.error("Failed to fetch medications. Using default list.");
      setMedicationList(medicationNames);
    }
  };
  fetchMedications();
}, []);

  // 1. Correct access to the medications array inside recordMedication
  const selectedMeds = medicationData?.medications || [];

  // 2. Logic to toggle medications while preserving the recordMedication object structure
  const handleMedicationToggle = (medName) => {
    setMedicationData((prevData) => {
      const currentMeds = prevData?.recordMedication?.medications || [];
      const isAlreadySelected = currentMeds.includes(medName);

      const updatedMeds = isAlreadySelected
        ? currentMeds.filter((m) => m !== medName)
        : [...currentMeds, medName];

      return {
        ...prevData,
        recordMedication: {
          ...prevData.recordMedication,
          medications: updatedMeds,
        },
      };
    });
  };

  // 3. Logic for notes/inputs specific to the recordMedication object
  function handleInputChange(e) {
    const { name, value } = e.target;
    setMedicationData((prevData) => ({
      ...prevData,
      recordMedication: {
        ...prevData.recordMedication,
        [name]: value,
      },
    }));
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="relative z-50">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="medications"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            Medication (select one or more)
          </label>

          <div className="grid grid-cols-5 gap-4 items-start justify-center">
            <div className="flex flex-col gap-2 col-span-4 relative">
              {/* Dropdown Header */}
              <div
                onClick={() => setOpenMedicationDropdown((prev) => !prev)}
                className={`w-full flex justify-between items-center text-base rounded-lg px-4 py-2.5 sm:py-3 border-2 transition-all bg-transparent cursor-pointer ${
                  openMedicationDropdown
                    ? "border-[#6976EB] text-[#161A41] dark:text-white"
                    : "border-[#D9D9D9]/30 text-[#808080] dark:text-gray-400"
                }`}
              >
                <p>
                  {selectedMeds.length > 0
                    ? `${selectedMeds.length} Selected`
                    : "Select Medication"}
                </p>
                <FaAngleDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openMedicationDropdown
                      ? "rotate-180 text-[#6976EB]"
                      : "rotate-0"
                  }`}
                />
              </div>

              {/* Dropdown List */}
              <AnimatePresence>
                {openMedicationDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 w-full bg-white dark:bg-[#1e224f] border-2 border-[#6976EB] rounded-lg mt-1 text-sm text-[#161A41] dark:text-white shadow-xl overflow-hidden z-[60]"
                  >
                    {medicationList.map((name) => {
                      const isSelected = selectedMeds.includes(name);
                      return (
                        <li
                          className={`px-4 py-3 hover:bg-[#6976EB]/10 cursor-pointer flex items-center justify-between transition-colors ${
                            isSelected
                              ? "bg-[#6976EB] hover:bg-[#6976EB]/80 text-white"
                              : ""
                          }`}
                          key={name}
                          onClick={() => handleMedicationToggle(name)}
                        >
                          <p className={isSelected ? "font-bold" : ""}>
                            {name}
                          </p>
                          {isSelected && (
                            <FaCircleCheck className="w-5 h-5 text-white" />
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Add Button */}
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 sm:py-3.5 font-bold cursor-pointer col-span-1 w-full bg-[#6976EB] text-white rounded-lg hidden md:flex items-center justify-center shadow-md"
            >
              Add Medication
            </motion.button>

            {/* Mobile Add Button */}
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-3.5 font-bold cursor-pointer col-span-1 w-full bg-[#6976EB] text-white rounded-lg flex md:hidden items-center justify-center shadow-md"
            >
              <RiAddLargeLine className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* --- SELECTED MEDICATIONS DISPLAY START --- */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selectedMeds.map((med) => (
            <motion.span
              key={med}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-[#6976EB]/10 border border-[#6976EB] text-[#6976EB] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm"
            >
              {med}
              <button
                type="button"
                onClick={() => handleMedicationToggle(med)}
                className="hover:text-red-500 hover:scale-110 cursor-pointer transition-all rounded-full p-0.5"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* --- SELECTED MEDICATIONS DISPLAY END --- */}

      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="medication-notes"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            Notes
          </label>

          <textarea
            onChange={handleInputChange}
            name="notes"
            id="medication-notes"
            value={medicationData?.notes || ""}
            placeholder="Add any additional notes about this medication..."
            className="w-full bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400 border-2 border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all min-h-[100px]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
