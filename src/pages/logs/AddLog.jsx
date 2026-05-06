//Assets & UI
import GlucoseIcon from "../../components/ui/GlucoseIcon";
import IconHeader from "../../components/ui/IconHeader";
import RadioButton from "../../components/ui/RadioButton";
import Button from "../../components/ui/Button";
import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { MdError } from "react-icons/md";

import { useState, useRef } from "react";
import { redirect } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { addLog } from "../../services/logServices";
import toast from "react-hot-toast";

//Forms
import LogBasicInfo from "../../components/logs/LogBasicInfo";
import GlucoseForm from "../../components/logs/GlucoseForm";
import MedicationForm from "../../components/logs/MedicationForm";
import MealForm from "../../components/logs/MealForm";
import EmptyLogType from "../../components/logs/EmptyLogType";
import AddMedicineModal from "../../components/modals/AddMedicineModal";

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

export default function AddLog() {
  const [logData, setLogData] = useState({
    log_title: "",
    log_description: "",
    logged_at: "",
    recordGlucose: {
      glucose_level: "",
      reading_type: "",
      a1c_estimation: "",
      notes: "",
    },
    recordMedication: {
      medications: [],
      notes: "",
    },
    recordMeal: {
      meal_type: "",
      meal_description: "",
      carbohydrate_estimation: "",
      calories_estimation: "",
      notes: "",
    },
  });
  const [isVisited, setIsVisited] = useState({
    glucose: true,
    medication: false,
    meal: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef();
  const [activeType, setActiveType] = useState("glucose");
  const logTypes = [
    { value: "glucose", label: "Glucose Check", icon: GlucoseIcon },
    { value: "medication", label: "Medication", icon: BiSolidInjection },
    { value: "meal", label: "Meal", icon: BsForkKnife },
  ];

  function hasAnyData(data) {
    if (!data) return false;

    return Object.values(data).some((value) => {
      // 1. If it's an array, check if it has items
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      // 2. If it's an object (and not null), recurse into it
      if (value !== null && typeof value === "object") {
        return hasAnyData(value);
      }

      // 3. For strings/numbers/etc, check if they are "filled"
      return value !== null && value !== "" && value !== undefined;
    });
  }

  function isGlucoseComplete(data) {
    return (data.glucose_level && data.reading_type) || false;
  }

  function isMedicationComplete(data) {
    return data.medications.length > 0 || false;
  }

  function isMealComplete(data) {
    return (data.meal_type && data.meal_description) || false;
  }

  function handleSelectedType(type) {
    setActiveType(type);
    setIsVisited((prev) => ({ ...prev, [type]: true }));
  }

  const glucoseIntended =
    hasAnyData(logData.recordGlucose) && isVisited.glucose;
  const medicationIntended =
    hasAnyData(logData.recordMedication) && isVisited.medications;
  const mealIntended = hasAnyData(logData.recordMeal) && isVisited.meal;

  const isFormValid =
    logData.log_title.trim() !== "" &&
    logData.log_description.trim() !== "" &&
    logData.logged_at.trim() !== "" &&
    (glucoseIntended ? isGlucoseComplete(logData.recordGlucose) : true) &&
    (medicationIntended
      ? isMedicationComplete(logData.recordMedication)
      : true) &&
    (mealIntended ? isMealComplete(logData.recordMeal) : true);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      log_title: logData.log_title,
      log_description: logData.log_description,
      logged_at: logData.logged_at,
      recordGlucose: glucoseIntended ? logData.recordGlucose : null,
      recordMedication: medicationIntended ? logData.recordMedication : null,
      recordMeal: mealIntended ? logData.recordMeal : null,
    };

    try {
      // Simulate API call delay
      const result = await addLog(data);
      if (result.success) {
        toast.success("Log added successfully!");
        redirect("/home");
      } else {
        toast.error("Failed to add log. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the log.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <IconHeader icon={GlucoseIcon} title="Add Logs" />

      <form
        method="post"
        className="space-y-8 max-w-5xl mx-auto"
        onSubmit={handleSubmit}
      >
        <LogBasicInfo logData={logData} setLogData={setLogData} />

        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="grid grid-cols-3 gap-4 items-start justify-center" // Changed items-center to items-start to handle error height
        >
          {logTypes.map((type) => {
            const Icon = type.icon;

            // Logic to determine if this specific section has an error
            let isIntended = false;
            let isComplete = false;

            if (type.value === "glucose") {
              isIntended =
                hasAnyData(logData.recordGlucose) && isVisited.glucose;
              isComplete = isGlucoseComplete(logData.recordGlucose);
            } else if (type.value === "medication") {
              isIntended =
                hasAnyData(logData.recordMedication) && isVisited.medication;
              isComplete = isMedicationComplete(logData.recordMedication);
            } else if (type.value === "meal") {
              isIntended = hasAnyData(logData.recordMeal) && isVisited.meal;
              isComplete = isMealComplete(logData.recordMeal);
            }

            const showIncompleteError = isIntended && !isComplete && activeType !== type.value;

            return (
              <motion.div
                key={type.value}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <RadioButton
                  name="reminderType"
                  value={type.value}
                  isChecked={activeType === type.value}
                  onChange={() => handleSelectedType(type.value)}
                >
                  <motion.div
                    animate={{ scale: activeType === type.value ? 1.1 : 1 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <p className="text-xs md:text-base">{type.label}</p>
                </RadioButton>

                {/* Localized Error Message */}
                <AnimatePresence>
                  {showIncompleteError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center justify-center gap-1 text-[#6976EB] mt-2 text-center text-xs sm:text-sm"
                    >
                      <MdError className=" w-4 h-4" />
                      <p className="font-medium leading-tight">Incomplete</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-7xl space-y-4"
          >
            {activeType === "glucose" && (
              <GlucoseForm
                glucoseData={logData.recordGlucose}
                setGlucoseData={setLogData}
              />
            )}
            {activeType === "medication" && (
              <MedicationForm
                medicationData={logData.recordMedication}
                setMedicationData={setLogData}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            {activeType === "meal" && (
              <MealForm
                mealData={logData.recordMeal}
                setMealData={setLogData}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/* Submit Button with Smooth Content Switch */}
        <Button
          disabled={!isFormValid || isSubmitting}
          type="submit"
          className={`w-full mt-8 px-6 py-4 transition-all flex items-center justify-center gap-2 ${
            !isFormValid || isSubmitting
              ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
              : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4 items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <CgSpinner className="text-white w-8 h-8" />
                </motion.div>
                <p>Adding Log</p>
              </motion.div>
            ) : (
              <motion.p
                key="static"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Add Log
              </motion.p>
            )}
          </AnimatePresence>
        </Button>
      </form>

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formRef={modalRef}
      />
    </div>
  );
}
