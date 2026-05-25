import GlucoseIcon from "../ui/GlucoseIcon";
import Button from "../ui/Button";
import RadioButton from "../ui/RadioButton";
import BaseModal from "../ui/BaseModal";

import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { MdError } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import LogBasicInfo from "../logs/LogBasicInfo";
import GlucoseForm from "../logs/GlucoseForm";
import MedicationForm from "../logs/MedicationForm";
import MealForm from "../logs/MealForm";
import AddMedicineModal from "./AddMedicineModal";

import { editLog } from "../../services/logServices";
import { formatForBackendDateTime } from "../../util/formatDiplayedDate";

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

// Keys that come from the server and should not count as "user entered data"
const USER_META_KEYS = new Set([
  "log_id",
  "user_id",
  "reading_id",
  "medication_id",
  "meal_id",
  "created_at",
  "updated_at",
  "average_glucose_level",
]);

export default function EditLogModal({ logDetails, isOpen, onClose, refresh }) {
  const { t } = useTranslation();
  const initialLogData = useRef(logDetails);
  const [logData, setLogData] = useState(logDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refrshMedications, setRefreshMedications] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef();
  const [activeType, setActiveType] = useState(
    logDetails.record_glucose
      ? "glucose"
      : logDetails.record_medication
        ? "medication"
        : "meal",
  );

  const logTypes = [
    {
      value: "glucose",
      label: t("logs.add-edit-log.types.glucose"),
      icon: GlucoseIcon,
    },
    {
      value: "medication",
      label: t("logs.add-edit-log.types.medication"),
      icon: BiSolidInjection,
    },
    {
      value: "meal",
      label: t("logs.add-edit-log.types.meal"),
      icon: BsForkKnife,
    },
  ];

  // ─── Helpers ────────────────────────────────────────────────────────────────

  // Checks if the user has entered any meaningful data, ignoring server metadata
  function hasUserEnteredData(data) {
    if (!data) return false;
    return Object.entries(data).some(([key, value]) => {
      if (USER_META_KEYS.has(key)) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (value !== null && typeof value === "object")
        return hasUserEnteredData(value);
      return value !== null && value !== "" && value !== undefined;
    });
  }

  function isGlucoseComplete(data) {
    return !!(data?.glucose_level && data?.reading_type);
  }

  function isMedicationComplete(data) {
    return Array.isArray(data?.medications) && data?.medications.length > 0;
  }

  function isMealComplete(data) {
    return !!(data?.meal_type && data?.meal_description);
  }

  function handleSelectedType(type) {
    setActiveType(type);
  }

  // ─── Derived State (all synchronous, no useEffect needed) ───────────────────

  // Does each section currently have user-entered data?
  const glucoseHasData = hasUserEnteredData(logData.record_glucose);
  const medicationHasData = hasUserEnteredData(logData.record_medication);
  const mealHasData = hasUserEnteredData(logData.record_meal);

  // Was a section originally present but now fully cleared by the user?
  const glucoseRemoved = !!logDetails.record_glucose && !glucoseHasData;
  const medicationRemoved =
    !!logDetails.record_medication && !medicationHasData;
  const mealRemoved = !!logDetails.record_meal && !mealHasData;

  // A section is "intended" only if it currently has user data
  const glucoseIntended = glucoseHasData;
  const medicationIntended = medicationHasData;
  const mealIntended = mealHasData;

  // A section is "valid" only if it's intended AND all required fields are filled
  const glucoseValid =
    glucoseIntended && isGlucoseComplete(logData.record_glucose);
  const medicationValid =
    medicationIntended && isMedicationComplete(logData.record_medication);
  const mealValid = mealIntended && isMealComplete(logData.record_meal);

  // ─── Form Validity ──────────────────────────────────────────────────────────

  const isFormValid =
    logData.log_title.trim() !== "" &&
    logData.log_description.trim() !== "" &&
    logData.logged_at.trim() !== "" &&
    // At least one section must be valid OR at least one section was deliberately removed
    (glucoseValid ||
      medicationValid ||
      mealValid ||
      glucoseRemoved ||
      medicationRemoved ||
      mealRemoved) &&
    // Any intended section must be complete — no half-filled sections allowed
    (!glucoseIntended || glucoseValid) &&
    (!medicationIntended || medicationValid) &&
    (!mealIntended || mealValid);

  // ─── Dirty Check ────────────────────────────────────────────────────────────

  // Form is dirty if data changed OR a section was fully removed
  const isDirty =
    JSON.stringify(logData) !== JSON.stringify(initialLogData.current) ||
    glucoseRemoved ||
    medicationRemoved ||
    mealRemoved;

  const isButtomDisabled = !isFormValid || !isDirty || isSubmitting;

  // ─── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      log_title: logData.log_title,
      log_description: logData.log_description,
      logged_at: formatForBackendDateTime(logData.logged_at),
      // Send null for any section that was cleared, keeping server metadata stripped
      record_glucose: glucoseIntended ? logData.record_glucose : null,
      record_medication: medicationIntended ? logData.record_medication : null,
      record_meal: mealIntended ? logData.record_meal : null,
    };

    try {
      console.log("Submitting updated log data:", data);
      const result = await editLog(logData.log_id, data);
      console.log("Update Log Result:", result);
      onClose();
      refresh();
      toast.success("Log updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating the log.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("logs.add-edit-log.edit-title")}
      icon={FiEdit}
    >
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
          className="grid grid-cols-3 gap-4 items-start justify-center"
        >
          {logTypes.map((type) => {
            const Icon = type.icon;

            let isIntended = false;
            let isComplete = false;

            if (type.value === "glucose") {
              isIntended = glucoseIntended;
              isComplete = isGlucoseComplete(logData.record_glucose);
            } else if (type.value === "medication") {
              isIntended = medicationIntended;
              isComplete = isMedicationComplete(logData.record_medication);
            } else if (type.value === "meal") {
              isIntended = mealIntended;
              isComplete = isMealComplete(logData.record_meal);
            }

            // Only show error when: section has data, it's incomplete, AND user is looking at another tab
            const showIncompleteError =
              isIntended && !isComplete && activeType !== type.value;

            return (
              <motion.div
                key={type.value}
                variants={itemVariants}
                className="flex flex-col items-center h-full"
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
                glucoseData={logData?.record_glucose}
                setGlucoseData={setLogData}
              />
            )}
            {activeType === "medication" && (
              <MedicationForm
                medicationData={logData?.record_medication}
                setMedicationData={setLogData}
                setIsModalOpen={setIsModalOpen}
                refetchMedications={refrshMedications}
                editMode={true}
              />
            )}
            {activeType === "meal" && (
              <MealForm
                mealData={logData?.record_meal}
                setMealData={setLogData}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Button
            type="button"
            onClick={onClose}
            className="h-full order-2 sm:order-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-6 py-4 font-bold cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center"
          >
            {t("logs.add-edit-log.cancel-button")}
          </Button>

          <Button
            disabled={isButtomDisabled}
            type="submit"
            className={`order-1 sm:order-2 w-full px-6 py-4 transition-all flex items-center justify-center gap-2 rounded-xl ${
              isButtomDisabled
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
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <CgSpinner className="text-white w-6 h-6" />
                  </motion.div>
                  <p>{t("logs.add-edit-log.edit-submitting")}</p>
                </motion.div>
              ) : (
                <motion.p
                  key="static"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {t("logs.add-edit-log.edit-button")}
                </motion.p>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </form>

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formRef={modalRef}
        setRefreshMedications={setRefreshMedications}
      />
    </BaseModal>
  );
}
