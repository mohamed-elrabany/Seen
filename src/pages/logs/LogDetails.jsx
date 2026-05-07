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

import { getLogDetails } from "../../services/logServices";

const dummyLogData = {
  log_id: "1",
  log_title: "Morning Log",
  log_description: "Felt good after breakfast.",
  logged_at: "2026-05-03T08:00:00Z",
  recordGlucose: {
    glucose_level: "120",
    reading_type: "random",
    a1c_estimation: "",
    notes: "",
  },
  recordMedication: {
    medications: ["Oxycodone", "Ibuprofen"],
    notes: "Medicines taken as prescribed.",
  },
  recordMeal: {
    meal_type: "Breakfast",
    meal_description: "Oatmeal with fruits.",
    carbohydrate_estimation: "30",
    calories_estimation: "200",
    notes: "Enjoyed the meal.",
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


useEffect(() => {
    const fetchLogData = async () => {
      // If no logId is present, we can't fetch anything
      if (!logId) {
        setLogData(dummyLogData);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getLogDetails(logId);
        if (data) {
          setLogData(data);
        } else {
          // Server returned empty or 404
          setLogData(dummyLogData);
          console.warn("No data from server, using dummy.");
        }
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
      <LogDetailsHeader logHeaderData={logData} logId={logId} />
      
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="space-y-4"
      >
        {logData?.recordGlucose && (
          <GlucoseDetails
            glucoseRecordData={logData.recordGlucose}
          />
        )}
        
        {logData?.recordMedication && (
          <MedicationDetails
            medicationRecordData={logData.recordMedication}
          />
        )}
        
        {logData?.recordMeal && (
          <MealDetails
            mealRecordData={logData.recordMeal}
          />
        )}
      </motion.div>
    </div>
  );
}