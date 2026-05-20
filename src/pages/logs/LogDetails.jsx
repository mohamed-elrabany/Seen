import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import LogDetailsHeader from "../../components/logs/details/LogDetailsHeader";
import GlucoseDetails from "../../components/logs/details/GlucoseDetails";
import MedicationDetails from "../../components/logs/details/MedicationDetails";
import MealDetails from "../../components/logs/details/MealDetails";
import LoadingPage from "../loading/LoadingPage";
import EditLogModal from "../../components/modals/EditLogModal";

import { getLogDetails } from "../../services/logServices";

const dummyLogData = {
  log_id: "",
  log_title: "",
  log_description: "",
  logged_at: "",
  recordGlucose: {
    glucose_level: null,
    reading_type: "",
    a1c_estimation: null,
    notes: "",
  },
  recordMedication: {
    medications: [],
    notes: "",
  },
  recordMeal: {
    meal_type: "",
    meal_description: "",
    carbohydrate_estimation: null,
    calories_estimation: null,
    notes: "",
  },
};

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

export default function LogDetails({ logId: propLogId }) {
  const { t } = useTranslation();
  const { logId: paramLogId } = useParams();

  // Use propLogId if passed (Modal), otherwise use paramLogId (Route)
  const logId = propLogId || paramLogId;

  const [logData, setLogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogData = async () => {
      // If no logId is present, we can't fetch anything

      setLoading(true);
      try {
        const data = await getLogDetails(logId);
        console.log("Fetched Log Data:", data); // Debugging log
        setLogData(data);
      } catch (error) {
        // Server is closed or network error
        console.error("Server is unreachable:", error);
        setLogData(dummyLogData);
        toast.error("Using offline demo data (Server Unreachable)");
      } finally {
        // Ensure loading stops even on failure
        setLoading(false);
      }
    };

    fetchLogData();
  }, [logId]);

  if (loading) return <LoadingPage />;
  if (!logData) return null;
  console.log("Log Data:", logData); // Debugging log

  return (
    <div className="space-y-8">
      <LogDetailsHeader logHeaderData={logData} logId={logId} setOpenModal={setIsEditModalOpen}/>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="space-y-4"
      >
        {logData?.record_glucose && (
          <GlucoseDetails glucoseRecordData={logData.record_glucose} />
        )}

        {logData?.record_medication && (
          <MedicationDetails medicationRecordData={logData.record_medication} />
        )}

        {logData?.record_meal && (
          <MealDetails mealRecordData={logData.record_meal} />
        )}
      </motion.div>

      <EditLogModal
        logDetails={logData || dummyLogData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
